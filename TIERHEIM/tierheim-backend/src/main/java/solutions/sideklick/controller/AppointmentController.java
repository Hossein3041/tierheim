package solutions.sideklick.controller;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import solutions.sideklick.authentication.aop.annotations.User;
import solutions.sideklick.authentication.dtos.error.ErrorDto;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.dtos.*;
import solutions.sideklick.services.AppointmentService;
import solutions.sideklick.utils.AppointmentUtils;

@Controller
public class AppointmentController {
  private final AppointmentService appointmentService;

  private static final Logger LOG = LoggerFactory.getLogger(AppointmentController.class);

  public AppointmentController(final AppointmentService appointmentService) {
    this.appointmentService = appointmentService;
  }

  @Get("${micronaut.base.path}/private/appointments/overview{?dates}")
  public HttpResponse<?> getAppointmentsOverview(@QueryValue(value = "dates", defaultValue = "") List<String> dates) {
    try {
      List<LocalDate> parsedDates = AppointmentUtils.parseDates(dates);

      if (parsedDates.isEmpty()) {
        LOG.warn("No valid 'dates' provided for /appointments/overview");
        return HttpResponse.badRequest(
            new ErrorDto(
                "Parameter 'dates' darf nicht leer sein. Erwartet: YYYY-MM-DD oder mehrere via Komma oder Wiederholung."));
      }

      AppointmentsOverviewDto dto = appointmentService.getAppointmentsOverview(parsedDates);
      return HttpResponse.ok(dto);
    } catch (IllegalArgumentException | DateTimeParseException e) {
      LOG.warn("Bad request for /appointments/overview: {}", e);
      return HttpResponse.badRequest(new ErrorDto(
          "Ungültige 'dates' Query-Parameter. Erwartet: YYYY-MM-DD, z. B. dates=2025-10-22 oder mehrere via wiederholten Parametern oder Komma."));
    } catch (Exception e) {
      LOG.error("Unexpected error fetching appointments overview", e);
      return HttpResponse.serverError(new ErrorDto("Unexpected error while fetching the appointments"));
    }
  }

  @Get("${micronaut.base.path}/private/appointments/types")
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<?> getAppointmentTypes() {
    try {
      List<AppointmentTypeDto> appointmentTypes = appointmentService.getAppointmentTypes();
      return HttpResponse.ok(appointmentTypes);
    } catch (Exception e) {
      LOG.error("Unexpected error fetching appointment types", e);
      return HttpResponse.serverError(new ErrorDto("Unexpected error while fetching the appointment types"));
    }
  }

  @Get("${micronaut.base.path}/private/appointments/categories")
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<?> getAppointmentCategories() {
    try {
      List<AppointmentCategoryDto> appointmentCategories = appointmentService.getAppointmentCategories();
      return HttpResponse.ok(appointmentCategories);
    } catch (Exception e) {
      LOG.error("Unexpected error fetching appointment categories", e);
      return HttpResponse.serverError(new ErrorDto("Unexpected error while fetching the appointment categories"));
    }
  }

  @Put("${micronaut.base.path}/private/appointments/{id}")
  public HttpResponse<?> updateAppointment(@User UserReadDto currentUser, @PathVariable Long id,
      @Body AppointmentRequestDto body) {
    try {
      AppointmentItemDto updatedAppointment = appointmentService.updateAppointment(id, body, currentUser);
      return HttpResponse.ok(updatedAppointment);
    } catch (EntityNotFoundException e) {
      String msg = e.getMessage().contains("Pet") ? "Tier mit der angegebenen ID wurde nicht gefunden"
          : "Termin mit der angegebenen ID wurde nicht gefunden";
      LOG.warn("Entity not found during update appointment {}: {}", id, msg);
      return HttpResponse.notFound(new ErrorDto(msg));
    } catch (IllegalArgumentException e) {
      LOG.warn("Bad request for update appointment: {}: {}", id, e);
      return HttpResponse.badRequest(new ErrorDto(e.getMessage()));
    } catch (Exception e) {
      LOG.error("Unexpected error updating appointment {}", id, e);
      return HttpResponse.serverError(new ErrorDto("Interner Fehler beim Aktualisieren des Termins"));
    }
  }

  @Delete("${micronaut.base.path}/private/appointments/{id}")
  public HttpResponse<?> deleteAppointment(@PathVariable Long id) {
    try {
      appointmentService.deleteAppointment(id);
      return HttpResponse.noContent();
    } catch (EntityNotFoundException e) {
      return HttpResponse.notFound(new ErrorDto("Termin mit der angegebenen ID wurde nicht gefunden"));
    } catch (Exception e) {
      LOG.error("Unexpected error deleting appointment {}", id, e);
      return HttpResponse.serverError(new ErrorDto("Interner Fehler beim Löschen des Termins"));
    }
  }

  @Post("${micronaut.base.path}/private/appointments")
  public HttpResponse<?> createAppointment(@Body AppointmentRequestDto request) {
    try {
      AppointmentItemDto createdAppointment = appointmentService.createAppointment(request);
      return HttpResponse.created(createdAppointment);
    } catch (EntityNotFoundException e) {
      LOG.warn("Entity not found: {}", e);
      return HttpResponse.notFound(new ErrorDto(e.getMessage()));
    } catch (IllegalArgumentException | DateTimeParseException e) {
      return HttpResponse.badRequest(new ErrorDto(e.getMessage()));
    } catch (Exception e) {
      LOG.error("Unexpected error creating appointment", e);
      return HttpResponse.serverError(new ErrorDto("Interner Fehler beim Erstellen des Termins"));
    }
  }
}

package solutions.sideklick.controller;

import io.micronaut.context.annotation.Executable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.persistence.PersistenceException;


import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import solutions.sideklick.dtos.*;
import solutions.sideklick.services.PetService;
@Controller
public class PetController {

  private final PetService petService;

  private static final Logger LOG = LoggerFactory.getLogger(PetController.class);

  public PetController(final PetService petService) {
    this.petService = petService;
  }

  @Get("${micronaut.base.path}/private/pet/{id}")
  public HttpResponse<?> getPetById(
      @PathVariable("id") final long id) {

    var result = petService.getPetById(id);
    if (result.isEmpty()) {
      Map<String, String> body = new HashMap<>();
      body.put("message", "Tier mit dieser ID nicht gefunden");
      return HttpResponse.notFound(body);
    }
    return HttpResponse.ok(result.get());
  }

  @Get("${micronaut.base.path}/private/pet/overview")
  public HttpResponse<?> getPetOverview(@QueryValue(defaultValue = "false") boolean archived) {

    CategorizedPetOverviewDto overview = petService.getPetOverview(archived);

    if (overview == null || overview.getCategorizedPets() == null || overview.getCategorizedPets().isEmpty()) {
      Map<String, String> body = new HashMap<>();
      body.put("message", archived
              ? "Keine archivierten Tiere gefunden"
              : "Keine aktiven Tiere gefunden");
      return HttpResponse.notFound(body);
    }
    return HttpResponse.ok(overview);
  }

  @Post("${micronaut.base.path}/private/apikey/pet/create")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  @ExecuteOn(TaskExecutors.IO)
  public HttpResponse<Map<String, String>> createPet(@Body final PetCreateBody petCreateBody) {
    try {
      petService.createPet(petCreateBody);
      return HttpResponse.created(Map.of("message", "Tier erfolgreich angelegt"));
    } catch (PersistenceException e) {
      Throwable root = e;
      while (root.getCause() != null) root = root.getCause();
      LOG.error("Fehler beim Erstellen des Tiers. Root cause: {} - {}", root.getClass().getName(), root.getMessage(), e);
      return HttpResponse.badRequest(Map.of(
              "message", "Fehlende oder ungültige Felder",
              "cause", root.getClass().getSimpleName() + ": " + String.valueOf(root.getMessage())
      ));
    } catch (IllegalStateException e) {
      return HttpResponse.badRequest(Map.of("message", "No 'Wartezimmer' is existing"));
    }
  }

  @Put("${micronaut.base.path}/private/pet/{petId}/updateUnit")
  public HttpResponse<?> updatePetUnit(@PathVariable("petId") final long petId, @Body final UpdateUnitDto updateUnitDto) {
    try {
       petService.updatePetUnit(petId, updateUnitDto.getUnitId());
      return HttpResponse.ok(Map.of("message","Unit erfolgreich aktualisiert."));
    } catch (IllegalArgumentException e) {
      return HttpResponse.badRequest(Map.of("message", e.getMessage()));
     } catch (PersistenceException e) {
        LOG.error("Fehler beim Erstellen des Tiers", e);
        return HttpResponse.badRequest(Map.of("message", "Fehlende oder ungültige Felder"));
    } catch(Exception e) {
      return HttpResponse.serverError(Map.of("message", "Interner Fehler beim Updaten: " + e.getMessage()));
    }
  }

  @Get("${micronaut.base.path}/private/pet/finders{?q}")
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<?> listFinders(@QueryValue Optional<String> q) {
    try {
      List<FinderListItemDto> result = petService.listFinders(q);
      return HttpResponse.ok(result);
    } catch (Exception e) {
      LOG.error("Fehler beim Laden der Finder-Liste", e);
      return HttpResponse.serverError(
              Map.of("message", "Interner Fehler beim Laden der Finder-Liste"));
    }
  }

  @Put("${micronaut.base.path}/private/pet/{id}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<?> updatePetById(@PathVariable("id") final long id, @Body PetUpdateBodyDto petUpdateBodyDto) {
    try {
      petService.updatePet(id, petUpdateBodyDto);
      return HttpResponse.ok(Map.of("message", "Tierdetails erfolgreich aktualisiert."));
    } catch (NoSuchElementException e){
      return HttpResponse.notFound(Map.of("message", "Tier mit dieser ID nicht gefunden"));
    } catch (IllegalArgumentException e) {
      return HttpResponse.badRequest(Map.of("message", e.getMessage()));
    } catch (Exception e) {
      LOG.error("Fehler beim Updaten", e);
      return HttpResponse.serverError(Map.of("message", "Interner Fehler beim Updaten: " + e.getMessage()));
    }
  }

  @Get("${micronaut.base.path}/private/pet/{id}/update/image/{imagePath}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<String> updatePetImage(
          @PathVariable("id") final String id,
          @PathVariable("imagePath") final String imagePath
  ) {
    petService.updateImageRef(id, imagePath);
    return HttpResponse.ok("Tier erfolgreich aktualisiert");
  }
}

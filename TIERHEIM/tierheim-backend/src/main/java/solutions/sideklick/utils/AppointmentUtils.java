package solutions.sideklick.utils;

import java.time.ZoneId;
import java.util.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import com.github.javaparser.quality.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import solutions.sideklick.dtos.AppointmentItemDto;
import solutions.sideklick.dtos.PetReferenceDto;
import solutions.sideklick.entities.AppointmentEntity;
import solutions.sideklick.entities.PetEntity;

@Getter
public final class AppointmentUtils {

    private static final DateTimeFormatter TIME_FORMAT = DateTimeFormatter.ofPattern("HH:mm");

    public static void sortByDateTime(List<AppointmentItemDto> appointmentItems) {
        appointmentItems.sort(Comparator
                .comparing((AppointmentItemDto dto) -> parseSafeDate(dto.getAppointmentDate()), Comparator.nullsLast(Comparator.naturalOrder()))
                .thenComparing(dto -> parseSafeTime(dto.getAppointmentTime()), Comparator.nullsLast(Comparator.naturalOrder()))
        );
    }

    private static LocalDate parseSafeDate(String dateString) {
        try {
            return dateString != null ? LocalDate.parse(dateString) : null;
        } catch (Exception e) {
            return null;
        }
    }

    private static LocalTime parseSafeTime(String timeString) {
        try {
            return timeString != null ? LocalTime.parse(timeString) : null;
        } catch (Exception e) {
            return null;
        }
    }

    public static AppointmentItemDto toItemDto(AppointmentEntity appointmentEntity) {
        if (appointmentEntity == null) {
            return null;
        }

        Long appointmentId = appointmentEntity.getId();
        String typeName = appointmentEntity.getType() != null ? appointmentEntity.getType().getName() : null;
        Long typeId = appointmentEntity.getType() != null ? appointmentEntity.getType().getId() : null;
        Long categoryId = appointmentEntity.getCategory() != null ? appointmentEntity.getCategory().getId() : null;
        String categoryName = appointmentEntity.getCategory() != null ? appointmentEntity.getCategory().getName() : null;

        LocalDate date = appointmentEntity.getDate();
        LocalTime time = appointmentEntity.getTime();
        String formattedTime = (time != null) ? TIME_FORMAT.format(time) : null;

        PetReferenceDto petReference = null;
        PetEntity petEntity = appointmentEntity.getPet();
        if (petEntity != null) {
            String breedName = (petEntity.getBreed() != null) ? petEntity.getBreed().getName() : null;
            String speciesName = (petEntity.getSpecies() != null) ? petEntity.getSpecies().getName() : null;
            Long petId = petEntity.getId();

            petReference = new PetReferenceDto(petId, petEntity.getName(), breedName, petEntity.getImage(), speciesName);
        }

        AppointmentItemDto dto = new AppointmentItemDto();
        dto.setId(appointmentId);
        dto.setAppointmentTypeId(typeId);
        dto.setAppointmentType(typeName);
        dto.setAppointmentCategoryId(categoryId);
        dto.setAppointmentCategory(categoryName);
        dto.setAppointmentDate(date != null ? date.toString() : null);
        dto.setAppointmentTime(formattedTime);
        dto.setAppointmentDescription(appointmentEntity.getNotes());
        dto.setChecked(appointmentEntity.isChecked());
        dto.setCheckedAt(
                appointmentEntity.getCheckedAt() != null
                        ? appointmentEntity.getCheckedAt().toString()
                        : null
        );
        dto.setCheckedBy(appointmentEntity.getCheckedBy());
        dto.setReferencedPet(petReference);

        return dto;
    }

    public static List<LocalDate> parseDates(@Nullable List<String> rawDates) {
        if (rawDates == null || rawDates.isEmpty()) return Collections.emptyList();
        return rawDates.stream()
                .filter(Objects::nonNull)
                .flatMap(s -> Arrays.stream(s.split(",")))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(LocalDate::parse)
                .distinct()
                .sorted()
                .toList();
    }

    public static DateTimeFormatter getTimeFormat() {
        return TIME_FORMAT;
    }
}

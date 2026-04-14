package solutions.sideklick.services;

import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.controller.AppointmentController;
import solutions.sideklick.dtos.*;
import solutions.sideklick.dtos.AppointmentRequestDto;
import solutions.sideklick.dtos.AppointmentTypeDto;
import solutions.sideklick.dtos.AppointmentCategoryDto;
import solutions.sideklick.dtos.AppointmentsOverviewDto;
import solutions.sideklick.dtos.AppointmentItemDto;
import solutions.sideklick.dtos.CheckAppointmentResponse;
import solutions.sideklick.entities.*;
import solutions.sideklick.repository.*;
import solutions.sideklick.utils.AppointmentUtils;

import static solutions.sideklick.utils.AppointmentUtils.sortByDateTime;
import static solutions.sideklick.utils.AppointmentUtils.toItemDto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.*;

@Singleton
public class AppointmentService {
    private static final String NO_ASSIGNMENT = "Ohne Zuordnung";
    private static final String UNKNOWN_CATEGORY = "Unbekannt";

    private final AppointmentRepository appointmentRepository;
    private final AppointmentTypeRepository appointmentTypeRepository;
    private final AppointmentCategoryRepository appointmentCategoryRepository;
    private final PetRepository petRepository;
    private final PetSpeciesRepository petSpeciesRepository;

    private static final Logger LOG = LoggerFactory.getLogger(AppointmentController.class);

    public AppointmentService(final AppointmentRepository appointmentRepository,
            final AppointmentCategoryRepository appointmentCategoryRepository, final PetRepository petRepository,
            final AppointmentTypeRepository appointmentTypeRepository, final PetSpeciesRepository petSpeciesRepository) {
        this.appointmentRepository = appointmentRepository;
        this.petRepository = petRepository;
        this.appointmentCategoryRepository = appointmentCategoryRepository;
        this.appointmentTypeRepository = appointmentTypeRepository;
        this.petSpeciesRepository = petSpeciesRepository;
    }

    public AppointmentsOverviewDto getAppointmentsOverview(List<LocalDate> dates) {
        if (dates == null || dates.isEmpty()) {
            throw new IllegalArgumentException("Parameter 'dates' darf nicht leer sein.");
        }

        List<AppointmentCategoryEntity> orderedAppointmentCategories = appointmentCategoryRepository
                .findAllOrderByOrderNumberAsc();

        Map<Long, String> categoryNameById = new HashMap<>(orderedAppointmentCategories.size());
        for (AppointmentCategoryEntity appointmentCategory : orderedAppointmentCategories) {
            categoryNameById.put(appointmentCategory.getId(), appointmentCategory.getName());
        }

        Long defaultCategoryId = orderedAppointmentCategories.isEmpty() ? null
                : orderedAppointmentCategories.get(0).getId();

        List<AppointmentEntity> appointmentEntities = appointmentRepository.findAllWithJoinsByDateIn(dates);

        int appointmentsSize = appointmentEntities.size();
        List<AppointmentItemDto> appointmentItems = new ArrayList<>(appointmentsSize);

        for (AppointmentEntity appointment : appointmentEntities) {
            AppointmentItemDto appointmentItemDto = toItemDto(appointment);
            appointmentItems.add(appointmentItemDto);
        }

        List<String> allSpeciesName = petSpeciesRepository.findAllByOrderByOrderNumberAsc().stream().map(PetSpeciesEntity::getName).toList();

        Map<String, List<AppointmentItemDto>> itemsBySpecies = new LinkedHashMap<>();
        for (String speciesName : allSpeciesName) {
            itemsBySpecies.put(speciesName, new ArrayList<>());
        }

        for (AppointmentItemDto item : appointmentItems) {
            String speciesKey = NO_ASSIGNMENT;
            if (item.getReferencedPet() != null) {
                String speciesName = item.getReferencedPet().getSpeciesName();
                if (speciesName != null && !speciesName.isBlank()) {
                    speciesKey = speciesName;
                }
            }
            itemsBySpecies.computeIfAbsent(speciesKey, k -> new ArrayList<>()).add(item);
        }

        Map<String, Map<String, List<AppointmentItemDto>>> grouped = new LinkedHashMap<>();

        for (Map.Entry<String, List<AppointmentItemDto>> speciesEntry : itemsBySpecies.entrySet()) {
            String species = speciesEntry.getKey();
            List<AppointmentItemDto> speciesItems = speciesEntry.getValue();

            Map<String, List<AppointmentItemDto>> itemsByCategoryName = new HashMap<>();

            for (AppointmentItemDto item : speciesItems) {
                Long categoryId = item.getAppointmentCategoryId();
                if (categoryId == null) {
                    categoryId = defaultCategoryId;
                }

                String categoryName = (categoryId != null) ? categoryNameById.get(categoryId) : null;
                if (categoryName == null || categoryName.isBlank()) {
                    categoryName = UNKNOWN_CATEGORY;
                }

                itemsByCategoryName.computeIfAbsent(categoryName, k -> new ArrayList<>()).add(item);
            }

            Map<String, List<AppointmentItemDto>> orderedCategoryMap = new LinkedHashMap<>();
            for (AppointmentCategoryEntity appointmentCategory : orderedAppointmentCategories) {
                List<AppointmentItemDto> categoryItems = itemsByCategoryName.getOrDefault(appointmentCategory.getName(),
                        new ArrayList<>());
                sortByDateTime(categoryItems);
                orderedCategoryMap.put(appointmentCategory.getName(), categoryItems);
            }

            List<String> extraCategoryNames = new ArrayList<>(itemsByCategoryName.keySet());
            extraCategoryNames.removeIf(orderedCategoryMap::containsKey);
            Collections.sort(extraCategoryNames);
            for (String extraName : extraCategoryNames) {
                List<AppointmentItemDto> categoryItems = itemsByCategoryName.getOrDefault(extraName, new ArrayList<>());
                sortByDateTime(categoryItems);
                orderedCategoryMap.put(extraName, categoryItems);
            }

            grouped.put(species, orderedCategoryMap);
        }

        return new AppointmentsOverviewDto(new LinkedHashMap<>(grouped));
    }

    public List<AppointmentTypeDto> getAppointmentTypes() {
        List<AppointmentTypeEntity> appointmentTypeEntities = appointmentTypeRepository.findAllOrderByOrderNumberAsc();

        List<AppointmentTypeDto> appointmentTypeDtos = new ArrayList<>();

        for (AppointmentTypeEntity appointmentTypeEntity : appointmentTypeEntities) {
            AppointmentTypeDto appointmentTypeDto = new AppointmentTypeDto(appointmentTypeEntity.getId(),
                    appointmentTypeEntity.getName());
            appointmentTypeDtos.add(appointmentTypeDto);
        }
        return appointmentTypeDtos;
    }

    public List<AppointmentCategoryDto> getAppointmentCategories() {
        List<AppointmentCategoryEntity> appointmentCategoryEntities = appointmentCategoryRepository
                .findAllOrderByOrderNumberAsc();

        List<AppointmentCategoryDto> appointmentCategoryDtos = new ArrayList<>();

        for (AppointmentCategoryEntity appointmentCategoryEntity : appointmentCategoryEntities) {
            AppointmentCategoryDto appointmentCategoryDto = new AppointmentCategoryDto(
                    appointmentCategoryEntity.getId(), appointmentCategoryEntity.getName());
            appointmentCategoryDtos.add(appointmentCategoryDto);
        }
        return appointmentCategoryDtos;
    }

    public AppointmentItemDto updateAppointment(Long id, AppointmentRequestDto request, UserReadDto currentUser) {
        if (request == null) {
            throw new IllegalArgumentException("Request body fehlt.");
        }

        validateAppointmentInput(request);

        AppointmentEntity appointmentEntity = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Appointment " + id + " not found"));

        applyAppointmentUpdates(appointmentEntity, request, currentUser);

        AppointmentEntity updated = appointmentRepository.update(appointmentEntity);
        return toItemDto(updated);
    }

    public AppointmentItemDto createAppointment(AppointmentRequestDto request) {

        validateAppointmentInput(request);

        AppointmentTypeEntity appointmentType = appointmentTypeRepository
                .findByNameIgnoreCase(request.getAppointmentType().trim()).orElseThrow(
                        () -> new IllegalArgumentException("Unbekannte Terminart: " + request.getAppointmentType()));

        AppointmentCategoryEntity appointmentCategory = appointmentCategoryRepository
                .findByNameIgnoreCase(request.getAppointmentCategory().trim()).orElseThrow(
                        () -> new IllegalArgumentException(
                                "Unbekannte Terminkategorie: " + request.getAppointmentCategory()));

        LocalDate date = LocalDate.parse(request.getAppointmentDate().trim());
        LocalTime time = LocalTime.parse(request.getAppointmentTime().trim(), AppointmentUtils.getTimeFormat());

        PetEntity petEntity = resolvePetEntity(request);

        AppointmentEntity appointmentEntity = buildAppointmentEntity(request, appointmentType, appointmentCategory,
                petEntity, date, time);

        AppointmentEntity saved = appointmentRepository.save(appointmentEntity);

        return toItemDto(saved);
    }

    private void validateAppointmentInput(AppointmentRequestDto request) {
        if (requestIsEmpty(request)) {
            throw new IllegalArgumentException("Keine Daten zum Aktualisieren angegeben.");
        }
    }

    private boolean requestIsEmpty(AppointmentRequestDto request) {
        return request.getAppointmentType() == null
                && request.getAppointmentCategory() == null
                && request.getAppointmentDate() == null
                && request.getAppointmentTime() == null
                && request.getAppointmentDescription() == null
                && request.getChecked() == null
                && (request.getReferencedPet() == null || request.getReferencedPet().getPetId() == null);
    }

    private void applyAppointmentUpdates(AppointmentEntity appointmentEntity, AppointmentRequestDto request, UserReadDto currentUser) {
        if (request.getAppointmentType() != null) {
            AppointmentTypeEntity appointmentType = appointmentTypeRepository
                    .findFirstByNameIgnoreCase(request.getAppointmentType())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unbekannte Terminart: " + request.getAppointmentType()));
            appointmentEntity.setType(appointmentType);
        }

        if (request.getAppointmentCategory() != null) {
            AppointmentCategoryEntity appointmentCategory = appointmentCategoryRepository
                    .findFirstByNameIgnoreCase(request.getAppointmentCategory())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unbekannte Terminkategorie: " + request.getAppointmentCategory()));
            appointmentEntity.setCategory(appointmentCategory);
        }

        if (request.getAppointmentDate() != null) {
            appointmentEntity.setDate(LocalDate.parse(request.getAppointmentDate()));
        }

        if (request.getAppointmentTime() != null) {
            LocalTime time = LocalTime.parse(request.getAppointmentTime(), AppointmentUtils.getTimeFormat());
            appointmentEntity.setTime(time);
        }

        if (request.getAppointmentDescription() != null) {
            appointmentEntity.setNotes(request.getAppointmentDescription());
        }

        if (request.getChecked() != null) {
            String currentUsername = currentUser.getUsername();
            applyCheckedWithHistory(appointmentEntity, request.getChecked(), currentUsername);
        }

        if (request.getReferencedPet() != null) {
            Long petId = request.getReferencedPet().getPetId();
            if (petId == null) {
                appointmentEntity.setPet(null);
            } else {
                PetEntity pet = petRepository.findById(petId)
                        .orElseThrow(() -> new EntityNotFoundException("Pet " + petId + " not found"));
                appointmentEntity.setPet(pet);
            }
        }
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Appointment " + id + " not found");
        }
        appointmentRepository.deleteById(id);
    }

    private PetEntity resolvePetEntity(AppointmentRequestDto request) {
        if (request.getReferencedPet() == null || request.getReferencedPet().getPetId() == null) {
            return null;
        }

        Long petId = request.getReferencedPet().getPetId();
        return petRepository.findById(petId)
                .orElseThrow(() -> new EntityNotFoundException("Pet " + petId + " nicht gefunden"));
    }

    private AppointmentEntity buildAppointmentEntity(AppointmentRequestDto request,
            AppointmentTypeEntity appointmentType, AppointmentCategoryEntity appointmentCategory, PetEntity petEntity,
            LocalDate date, LocalTime time) {
        AppointmentEntity appointmentEntity = new AppointmentEntity();
        appointmentEntity.setDate(date);
        appointmentEntity.setTime(time);
        appointmentEntity.setNotes(request.getAppointmentDescription());
        appointmentEntity.setType(appointmentType);
        appointmentEntity.setCategory(appointmentCategory);

        appointmentEntity.setPet(petEntity);
        appointmentEntity.setChecked(false);
        appointmentEntity.setCheckedAt(null);
        appointmentEntity.setCheckedBy(null);
        return appointmentEntity;
    }

    @Transactional
    public CheckAppointmentResponse updateChecked(Long id, Optional<Boolean> desiredCheck, UserReadDto currentUser) {
        if (desiredCheck.isEmpty()) {
            throw new IllegalArgumentException("Bitte den 'checked'-Status angeben (true oder false).");
        }

        boolean newChecked = desiredCheck.get();

        AppointmentEntity appointmentEntity = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Termin mit der angegebenene ID wurde nicht gefunden"));

        String currentUsername = currentUser.getUsername();
        applyCheckedWithHistory(appointmentEntity, newChecked, currentUsername);

        appointmentRepository.update(appointmentEntity);

        return new CheckAppointmentResponse(appointmentEntity.getId(), appointmentEntity.isChecked());
    }

    private void applyCheckedWithHistory(AppointmentEntity appointmentEntity, Boolean requestedChecked, String currentUsername) {
        if (requestedChecked == null) {
            return;
        }

        boolean oldChecked = appointmentEntity.isChecked();
        boolean newChecked = requestedChecked;

        appointmentEntity.setChecked(newChecked);

        if (!oldChecked && newChecked && appointmentEntity.getCheckedAt() == null) {
            appointmentEntity.setCheckedAt(Instant.now());
            appointmentEntity.setCheckedBy(currentUsername);
        }

        if (oldChecked && !newChecked) {
            appointmentEntity.setCheckedAt(null);
            appointmentEntity.setCheckedBy(null);
        }
    }

}

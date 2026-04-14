package solutions.sideklick.services;

import io.micronaut.data.exceptions.EmptyResultException;
import io.micronaut.transaction.annotation.ReadOnly;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.persistence.PersistenceException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import solutions.sideklick.dtos.*;
import solutions.sideklick.generic.mappers.*;
import solutions.sideklick.entities.*;
import solutions.sideklick.dtos.CategorizedPetOverviewDto;
import solutions.sideklick.dtos.PetCreateBody;
import solutions.sideklick.dtos.PetDetailsDto;
import solutions.sideklick.entities.*;
import solutions.sideklick.generic.mappers.FinderMapper;
import solutions.sideklick.generic.mappers.PetDetailsMapper;
import solutions.sideklick.generic.mappers.PetOverviewMapper;
import solutions.sideklick.repository.*;
import solutions.sideklick.types.AnimalReasonReceiveType;
import solutions.sideklick.types.PetSex;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;

import solutions.sideklick.entities.PetSpeciesEntity;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

@Singleton
@AllArgsConstructor
public class PetService {

    private final Logger logger = LoggerFactory.getLogger(PetService.class);

    private final PetRepository petRepository;
    private final PetSpeciesRepository petSpeciesRepository;
    private final BreedRepository breedRepository;
    private final ColorRepository colorRepository;
    private final UnitRepository unitRepository;
    private final FinderRepository finderRepository;
    private final PetFoodRepository petFoodRepository;
    private final PetMedicationRepository petMedicationRepository;
    private final PetAiMatchingService aiMatchingService;
    private final PlacementStatusRepository placementStatusRepository;

    private static final String VET_PREFIX = "Veterinäramt:";
    private static final String WAITING_ROOM = "Wartezimmer";
    private static final String DEAD_ANIMALS_UNIT = "Tote Tiere";

    private static final String PS_AVAILABLE = "Available";
    private static final String PS_RESERVED = "Reserved";
    private static final String PS_BOARDING = "Boarding";
    private static final String PS_ADOPTION_SCHEDULED = "AdoptionScheduled";

    private static final long FALLBACK_SPECIES_ID = 2L;
    private static final String FALLBACK_SPECIES_NAME = "Pferd";

    private static String normKey(String s) {
        if (s == null) return null;
        String t = java.text.Normalizer.normalize(s, java.text.Normalizer.Form.NFD).replaceAll("\\p{M}+", "");
        return t.trim().toLowerCase();
    }

    @Transactional
    public Optional<PetDetailsDto> getPetById(final long id) {
        Optional<PetEntity> petOpt = petRepository.findById(id);

        if (petOpt.isEmpty()) {
            return Optional.empty();
        } else {
            PetEntity pet = petOpt.get();
            pet.getFoods(); // Initialisation because of lazy loading
            pet.getMedications(); // Initialisation because of lazy loading
            pet.getPlacementStatus(); // Initialisation because of lazy loading
            PetDetailsDto detailsDto = PetDetailsMapper.toDto(pet);
            return Optional.of(detailsDto);
        }
    }

    @ReadOnly
    public CategorizedPetOverviewDto getPetOverview(boolean archived) {
        final boolean isActive = !archived;

        final List<PetEntity> pets = petRepository.findAllOverviewByActive(isActive);

        final List<PetSpeciesEntity> species = petSpeciesRepository.findAll();

        return PetOverviewMapper.categorizePetsBySpecies(pets, species);
    }

    @Transactional
    public void createPet(PetCreateBody petCreateBody) {
        validateCreateInput(petCreateBody);

        PetEntity pet = new PetEntity();

        LocalDate normalizedBirth = normalizeDate(petCreateBody.getBirthdate());
        LocalDate normalizeFound = normalizeDate(petCreateBody.getFoundDate());

        pet.setBirthdate(normalizedBirth);
        pet.setDateFound(normalizeFound);

        // TODO determine functions aendern am pet object? Dann sollte dies als return-Partameter zurückgeliefert werden oder ?  (Michael)
        determineAndMapSpecies(petCreateBody, pet);
        determineAndMapBreed(petCreateBody, pet);
        determineAndMapColor(petCreateBody, pet);
        determineAndSetSex(petCreateBody, pet);
        findOrCreateFinder(petCreateBody, pet);

        pet.setName(petCreateBody.getName());
        pet.setFoundLocation(petCreateBody.getFoundLocation());
        pet.setChipNumber(petCreateBody.getChipNumber());
        pet.setIsRegistered(petCreateBody.isRegistered());
        pet.setIsCastrated(petCreateBody.isNeutered());
        pet.setSpecialNotes(petCreateBody.getSpecialCharacteristics());
        pet.setIsExtraInvoice(petCreateBody.isHasExtraInvoice());

        AnimalReasonReceiveType intakeReason = resolveIntakeReason(petCreateBody);
        pet.setIntakeReason(intakeReason);

        pet.setIsActive(Boolean.TRUE);

        if (intakeReason == AnimalReasonReceiveType.ANIMALDEAD) {
            setDefaultUnitDeadAnimals(pet);
        } else {
            setDefaultUnitWaitingRoom(pet);
        }

        pet.setPlacementStatus(derivePlacementStatus(intakeReason));

        PetEntity savedPet = petRepository.save(pet);
        if (!(savedPet != null && savedPet.getId() != null )) {
            logger.error("Could not create pet with name {}", pet.getName());
            throw new PersistenceException("Pet not created.");
        }
    }

    private PlacementStatusEntity derivePlacementStatus(AnimalReasonReceiveType intakeReason) {
        if (intakeReason == AnimalReasonReceiveType.ANIMALDEAD) {
            return null;
        }

        String resultPlacementStatus;

        if (intakeReason == null) {
            resultPlacementStatus = PS_AVAILABLE;
        } else {
            switch (intakeReason) {
                case BOARDING:
                    resultPlacementStatus = PS_BOARDING;
                    break;
                case CONFISCATION:
                case VET_OFFICE:
                    resultPlacementStatus = PS_RESERVED;
                    break;
                case FOUND:
                case SURRENDER:
                default:
                    resultPlacementStatus = PS_AVAILABLE;
            }
        }

        return placementStatusRepository.findByNameIgnoreCase(resultPlacementStatus)
                .orElseThrow(() -> new IllegalStateException(
                        "PlacementStatus '" + resultPlacementStatus + "' nicht gefunden – Stammdaten prüfen."));
    }

    private void validateCreateInput(PetCreateBody petCreateBody) {
        if (petCreateBody == null) {
            throw new IllegalArgumentException("Request body fehlt.");
        }
        if (petCreateBody.getName() == null || petCreateBody.getName().isBlank()) {
            throw new IllegalArgumentException("Name ist Pflicht.");
        }
    }

    private AnimalReasonReceiveType resolveIntakeReason(PetCreateBody petCreateBody) {
        if (petCreateBody.getIntakeReason() != null) {
            return petCreateBody.getIntakeReason();
        }

        if (petCreateBody.getFinderName() != null && petCreateBody.getFinderName().startsWith(VET_PREFIX)) {
            return AnimalReasonReceiveType.VET_OFFICE;
        }

        if ((petCreateBody.getFoundDate() != null && !petCreateBody.getFoundDate().isBlank()) || (petCreateBody.getFoundLocation() != null && !petCreateBody.getFoundLocation().isBlank())) {
            return AnimalReasonReceiveType.FOUND;
        }

        return null;
    }

    private LocalDate normalizeDate(String inputDate) {
        if (inputDate == null || inputDate.isBlank()) return null;

        String trimmedDate = inputDate.trim();

        try {
            return LocalDate.parse(trimmedDate);
        } catch (Exception e) {
           logger.warn("[PetService]: Could not parse trimmedDate", e);
        }

        String[] patterns = {
                "dd.MM.yyyy", "dd/MM/yyyy", "dd-MM-yyyy",
                "d.M.yyyy", "d/M/yyyy", "d-M-yyyy",
                "dd.MM.yy", "dd/MM/yy", "dd-MM-yy"
        };

        for (String pattern : patterns) {
            try {
                java.time.format.DateTimeFormatter fmt = java.time.format.DateTimeFormatter.ofPattern(pattern);
                return LocalDate.parse(trimmedDate, fmt);
            } catch (Exception e) {
                logger.warn("[PetService]: Could not parse trimmedDate from pattern array", e);
            }
        }

        try {
            AiMatchResultDto result = aiMatchingService.matchOut("date", trimmedDate);
            if (result != null && result.getName() != null) {
                return LocalDate.parse(result.getName());
            }
        } catch (Exception e) {
            logger.warn("[normalizeDate] KI-Versuch fehlgeschlagen: {}", e.getMessage());
        }

        logger.warn("[normalizeDate] Kein Datumsformat erkannt für '{}'", inputDate);
        return null;
    }

    private void findOrCreateFinder(final PetCreateBody petCreateBody,final PetEntity pet) {
        String fullName = petCreateBody.getFinderName();
        if (fullName == null || fullName.isBlank()) {
            pet.setFinder(null);
            return;
        }

        try {
            AiMatchResultDto outDto = aiMatchingService.matchOut("finder", fullName);
            if (outDto.getId() != null) {
                FinderEntity finder = new FinderEntity();
                finder.setId(Long.valueOf(outDto.getId()));
                pet.setFinder(finder);
                return;
            }
        } catch (Exception e) {
            throw new IllegalStateException("KI-Matching für Finder fehlgeschlagen", e);
        }

        String[] nameParts = fullName.trim().split("\\s+", 2);
        Optional<FinderEntity> finder = Optional.empty();

        if (nameParts.length == 2) {
            finder = finderRepository.findByFirstNameAndLastName(nameParts[0], nameParts[1]);
        } else if (nameParts.length == 1) {
            finder = finderRepository.findByFirstName(nameParts[0]);
        }

        if (finder.isPresent()) {
            pet.setFinder(finder.get());
            return;
        } else {
            FinderEntity newFinder = FinderMapper.mapFromPetCreateBodyToFinder(petCreateBody);
            logger.info("[findOrCreateFinder] Creating new finder: {}", petCreateBody.getFinderName());
            FinderEntity savedFinder = finderRepository.save(newFinder);

            if (savedFinder == null || savedFinder.getId() == null) {
                logger.error("Could not create finder with name {}", newFinder.getFirstName());
                throw new PersistenceException("Pet not created.");
            } else {
                logger.info("[findOrCreateFinder] Saved finder with id={} and name={} {}",
                        savedFinder.getId(),
                        savedFinder.getFirstName(),
                        savedFinder.getLastName());
                pet.setFinder(savedFinder);
            }
        }
    }

    private void determineAndSetSex(final PetCreateBody petCreateBody, final PetEntity pet) {
        try {
            pet.setSex(PetSex.valueOf(petCreateBody.getSex()));
        } catch (final IllegalArgumentException e) {
            logger.warn("Could not determine sex of new pet with name {} : Given value: {}", petCreateBody.getName(), petCreateBody.getSex());
            pet.setSex(PetSex.UNKNOWN);
        }
    }

    private void setDefaultUnitWaitingRoom(PetEntity pet) {
        try{
            UnitEntity waitingRoom = unitRepository.findByName(WAITING_ROOM);
            pet.setUnit(waitingRoom);
        }
        catch (EmptyResultException e){
            logger.error("Could not find default unit:  {}", WAITING_ROOM);
            throw new IllegalStateException("Standard-Einheit 'Wartebereich' nicht gefunden.");
        }
    }

    private void setDefaultUnitDeadAnimals(PetEntity pet) {
        try {
            UnitEntity deadAnimalUnit = unitRepository.findByName(DEAD_ANIMALS_UNIT);
            pet.setUnit(deadAnimalUnit);
        } catch (EmptyResultException e) {
            logger.error("Could not find default unit for dead animals: {}", DEAD_ANIMALS_UNIT);
            throw new IllegalStateException("Standard-Einheit 'Tote Tiere' nicht gefunden.");
        }
    }

    private void determineAndMapSpecies(PetCreateBody petCreateBody, PetEntity pet) {

        final String speciesInput = petCreateBody.getSpecies();

        if (speciesInput == null || speciesInput.isBlank()) {
            logger.warn("[species] missing input for pet '{}'; default to {}({})", petCreateBody.getName(), FALLBACK_SPECIES_NAME, FALLBACK_SPECIES_ID);
            pet.setSpecies(refOrSubSpecies(FALLBACK_SPECIES_ID));
            return;
        }

        try {
            AiMatchResultDto outDto = aiMatchingService.matchOut("species", speciesInput);
            if (outDto != null && outDto.getId() != null) {
                long id = Long.parseLong(outDto.getId());
                pet.setSpecies(refOrSubSpecies(id));
                return;
            } else {
                logger.info("[species] AI returned null/ambiguous for input='{}'. Default -> {}({})",
                        speciesInput, FALLBACK_SPECIES_NAME, FALLBACK_SPECIES_ID);
            }
        } catch (Exception e) {
            logger.warn("[species] AI matching failed ({}). input='{}' -> default {}({})",
                    e.getClass().getSimpleName(), speciesInput, FALLBACK_SPECIES_NAME, FALLBACK_SPECIES_ID);
        }

        pet.setSpecies(refOrSubSpecies(FALLBACK_SPECIES_ID));
    }

    private PetSpeciesEntity refOrSubSpecies(long id) {
        PetSpeciesEntity e = new PetSpeciesEntity();
        e.setId(id);
        return e;
    }

    private void determineAndMapBreed(PetCreateBody petCreateBody, PetEntity pet) {
        String breedInput = petCreateBody.getBreed();
        if (breedInput == null || breedInput.isBlank()) {
            pet.setBreed(null);
            return;
        }

        AiMatchResultDto outDto = null;
        try {
            outDto = aiMatchingService.matchOut("breed", breedInput);
        } catch (Exception e) {
            logger.warn("[breed] AI matching failed ({}): '{}'", e.getClass().getSimpleName(), breedInput);
        }

        if (outDto != null && outDto.getId() != null) {
            Optional<PetBreedEntity> byAiId = breedRepository.findById(Long.valueOf(outDto.getId()));

            if (byAiId.isPresent()) {
                pet.setBreed(byAiId.get());
                return;
            } else {
                logger.warn("[breed] AI returned id={}, but not found in DB. Falling back to name rules.", outDto.getId());
            }
        } else {
            logger.debug("[breed] AI did not return a match for '{}'", breedInput);
        }

        final String normalizedBreedName = PetAiMatchingService.normalizeName(breedInput);
        Optional<PetBreedEntity> existingBreed = breedRepository.findByNameCaseInsensitive(normalizedBreedName);

        if (existingBreed.isPresent()) {
            pet.setBreed(existingBreed.get());
        } else {
            PetBreedEntity createdBreed = breedRepository.save(new PetBreedEntity(null, normalizedBreedName));
            pet.setBreed(createdBreed);
        }
    }

    private void determineAndMapColor(PetCreateBody petCreateBody, PetEntity pet) {
        String colorInput = petCreateBody.getColor();
        if (colorInput == null || colorInput.isBlank()) {
            pet.setColor(null);
            return;
        }

        Long aiId = null;
        try {
            AiMatchResultDto outDto = aiMatchingService.matchOut("color", colorInput);
            if (outDto != null && outDto.getId() != null) {
                aiId = Long.valueOf(outDto.getId());
            }
        } catch (Exception e)  {
            logger.warn("[color] AI matching failed ({}). input='{}'", e.getClass().getSimpleName(), colorInput, e);
        }

        if (aiId != null) {
            colorRepository.findById(aiId).ifPresent(c -> {
                pet.setColor(c);
            });
            if (pet.getColor() != null) {
                return;
            }
            logger.warn("[color] AI id {} not found in DB; continue with name-based fallback. input='{}'", aiId, colorInput);
        }

        String normalizedColorName = PetAiMatchingService.normalizeName(colorInput).trim();

        Optional<PetColorEntity> existingColor = colorRepository.findByNameCaseInsensitive(normalizedColorName);
        if (existingColor.isPresent()) {
            pet.setColor(existingColor.get());
            return;
        }

        try {
            logger.info("[color] input='{}', normalized='{}', aiId={}", colorInput, normalizedColorName, aiId);
            PetColorEntity createdColor = colorRepository.save(new PetColorEntity(null, normalizedColorName));
            pet.setColor(createdColor);
        } catch (Exception e) {
            Optional<PetColorEntity> again = colorRepository.findByNameCaseInsensitive(normalizedColorName);
            if (again.isPresent()) {
                pet.setColor(again.get());
            } else {
                throw new PersistenceException("Could not create or resolve color: " + normalizedColorName, e);
            }
        }
    }

    @Transactional
    public void updatePetUnit(long petId, Long newUnitId) {
        Optional<PetEntity> petOpt = petRepository.findById(petId);

        if(petOpt.isEmpty()){
            throw new IllegalStateException("Pet mit ID" + petId + " nicht gefunden");
        }

        Optional<UnitEntity> newUnitOpt = unitRepository.findById(newUnitId);

        if(newUnitOpt.isEmpty()){
            throw new IllegalStateException("Unit mit ID " + newUnitId + " nicht gefunden");
        }

        petRepository.updateUnit(petId, newUnitId);
    }

    @Transactional
    public List<FinderListItemDto> listFinders(Optional<String> q) {
        List<FinderEntity> rows = q.filter(s -> !s.isBlank())
                .map(String::trim)
                .map(finderRepository::searchByNameLike)
                .orElseGet(finderRepository::findAllOrderByName);

        return rows.stream().map(FinderListItemMapper::toDto).toList();
    }


    @Transactional
    public void updatePet(final long id, final PetUpdateBodyDto body) {
        PetEntity pet = petRepository.findById(id).orElseThrow(NoSuchElementException::new);

        applyBirthdate(pet, body.getBirthdate());
        PetUpdateMapper.applyBasics(pet, body);

        if (body.getPlacementStatusId() != null) {
            PlacementStatusEntity ps = placementStatusRepository.findById(body.getPlacementStatusId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unbekannter Placement-Status-ID: " + body.getPlacementStatusId()
                    ));
            pet.setPlacementStatus(ps);
        }

        setAssocIfPresent(body.getSpeciesId(), petSpeciesRepository::findById, pet::setSpecies, "speciesId");
        setAssocIfPresent(body.getBreedId(), breedRepository::findById, pet::setBreed, "breedId");
        setAssocIfPresent(body.getColorId(), colorRepository::findById, pet::setColor, "colorId");
        setAssocIfPresent(body.getUnitId(), unitRepository::findById, pet::setUnit, "unitId");

        setFinderIfPresent(pet, body.getFinderId(), body.getFinderPhone());

        if(body.getFoods() != null) {
            List<PetFoodEntity> foods = resolvePairs(
              body.getFoods(),
              this::parseId,
              petFoodRepository::findById,
              petFoodRepository::findByNameCaseInsensitive,
              name -> petFoodRepository.save(new PetFoodEntity(name))
                    );
            pet.setFoods(dedupBy(foods, PetFoodEntity::getId));
        }

        if(body.getMedications() != null) {
            List<PetMedicationEntity> meds = resolvePairs(
                    body.getMedications(),
                    this::parseId,
                    petMedicationRepository::findById,
                    petMedicationRepository::findByNameCaseInsensitive,
                    name -> petMedicationRepository.save(new PetMedicationEntity(name))
            );
            pet.setMedications(dedupBy(meds, PetMedicationEntity::getId));
        }

        petRepository.update(pet);
    }

    private void applyBirthdate(PetEntity pet, String birthdate) {
        if (birthdate == null || birthdate.isBlank()) return;

        try {
            pet.setBirthdate(LocalDate.parse(birthdate));
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Ungültiges Datumsformat für birthdate: " + birthdate);
        }
    }

    private <T> void setAssocIfPresent(Long id, Function<Long, Optional<T>> finder, Consumer<T> setter, String fieldNameForError) {
        if(id == null) return;
        T entity = finder.apply(id).orElseThrow(() -> new IllegalArgumentException("Ungültige " + fieldNameForError));
        setter.accept(entity);
    }

    private void setFinderIfPresent(PetEntity pet, Long finderId, String phone) {
        if(finderId != null) {
            FinderEntity f = finderRepository.findById(finderId).orElseThrow(() -> new IllegalArgumentException("Ungültige finderId"));
            pet.setFinder(f);
        }
        if(phone != null && pet.getFinder() != null) {
            pet.getFinder().setPhone(phone);
        }
    }

    private long parseId(String idStr) {
        try {
            return Long.parseLong(idStr);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Ungültige ID: " + idStr);
        }
    }

    private <E> List<E> resolvePairs(
            List<NameIdPairDto> pairs,
            Function<String, Long> idParser,
            Function<Long, Optional<E>> findById,
            Function<String, Optional<E>> findByNameCaseInsensitive,
            Function<String, E> createAndSaveByName) {
        List<E> result = new ArrayList<>();
        for(NameIdPairDto dto : pairs) {
            String idStr = dto.getId();
            if(idStr != null && !idStr.isBlank()) {
                long id = idParser.apply(idStr);
                E entity = findById.apply(id).orElseThrow(() -> new IllegalArgumentException("ID" + id + " nicht gefunden"));
                result.add(entity);
                continue;
            }

            String name = dto.getName() == null ? "" : dto.getName().trim();
            if(name.isEmpty()) {
                throw new IllegalArgumentException("Eintrag ohne ID braucht einen Namen");
            }
            E entity = findByNameCaseInsensitive.apply(name).orElseGet(() -> createAndSaveByName.apply(name));
            result.add(entity);
        }
        return result;
    }

    private static <E, K> List<E> dedupBy(List<E> list, Function<E, K> keyExtractor) {
        return new ArrayList<>(
                list.stream().collect(
                        Collectors.toMap(
                                keyExtractor,
                                e -> e,
                                (a, b) -> a,
                                LinkedHashMap::new
                        )
                ).values()
        );
    }

    @Transactional
    public void updateImageRef(String id, String imagePath) {
        Optional<PetEntity> petOpt =  this.petRepository.findById(Long.parseLong(id));
        if (petOpt.isEmpty()) {
            // TODO Was machen wir dann?
        } else {
            PetEntity pet = petOpt.get();
            pet.setImage(imagePath);
            this.petRepository.save(pet);
        }
    }
}

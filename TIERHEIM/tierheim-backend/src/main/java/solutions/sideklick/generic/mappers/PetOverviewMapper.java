package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.CategorizedPetOverviewDto;
import solutions.sideklick.dtos.PetOverviewDto;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.PetSpeciesEntity;
import solutions.sideklick.types.AnimalReasonReceiveType;
import solutions.sideklick.types.PlacementStatus;

import java.util.*;
import java.util.stream.Collectors;

public class PetOverviewMapper {

    private static final String P = "P";
    private static final String R = "R";

    public static CategorizedPetOverviewDto categorizePetsBySpecies(final List<PetEntity> pets, final List<PetSpeciesEntity> allSpecies) {

        Map<String, List<PetOverviewDto>> categorized = allSpecies.stream()
                .sorted(Comparator.comparing(PetSpeciesEntity::getOrderNumber))
                .collect(Collectors.toMap(
                        PetSpeciesEntity::getName,
                        s -> new ArrayList<>(),
                        (existing, replacement) -> existing,
                        LinkedHashMap::new));

        for (PetEntity pet : pets) {
            String speciesName = pet.getSpecies() != null ? pet.getSpecies().getName() : "Unbekannt";

            categorized.computeIfAbsent(speciesName, k -> new ArrayList<>())
                    .add(mapToOverviewDto(pet));
        }

        CategorizedPetOverviewDto dto = new CategorizedPetOverviewDto();
        dto.setCategorizedPets(categorized);
        return dto;
    }


    private static PetOverviewDto mapToOverviewDto(PetEntity pet) {
        PetOverviewDto dto = new PetOverviewDto();
        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setBreed(pet.getBreed() != null ? pet.getBreed().getName() : null);
        dto.setImage(pet.getImage());
        dto.setChipNumber(pet.getChipNumber());
        dto.setLocationUnit(pet.getUnit() != null ? pet.getUnit().getName() : null);
        dto.setSpecialNote(pet.getSpecialNotes() != null && !pet.getSpecialNotes().isBlank());
        dto.setPlacementStatus(pet.getPlacementStatus() != null ? pet.getPlacementStatus().getName() : null);
        dto.setPlacementStatusId(pet.getPlacementStatus() != null ? pet.getPlacementStatus().getId() : null);
        dto.setLocationShortName(pet.getUnit() != null ? pet.getUnit().getSection().getLocation().getShortName() : "");
        dto.setSectionShortName(pet.getUnit() != null ? pet.getUnit().getSection().getShortName() : "");
        dto.setAnimalReasonType(pet.getIntakeReason() != null ? pet.getIntakeReason().name() : null);
        dto.setFoundDate(pet.getDateFound());
        dto.setPrimaryBadge(computePrimaryBadge(pet));
        dto.setHasAttention(computeHasAttention(pet));
        return dto;
    }

    private static String computePrimaryBadge(PetEntity pet) {
        String placement = pet.getPlacementStatus() != null ? pet.getPlacementStatus().getName() : null;

        if ("Reserved".equalsIgnoreCase(placement)) {
            return R;
        }

        if (pet.getIntakeReason() == AnimalReasonReceiveType.BOARDING || "Boarding".equalsIgnoreCase(placement)) {
            return P;
        }

        return null;
    }

    private static boolean computeHasAttention(PetEntity pet) {
        return pet.getSpecialNotes() != null && !pet.getSpecialNotes().trim().isEmpty();
    }

}

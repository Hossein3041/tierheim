package solutions.sideklick.generic.mappers;

import java.util.Collections;
import java.util.stream.Collectors;
import solutions.sideklick.dtos.*;
import solutions.sideklick.entities.*;

public class PetDetailsMapper {

    public static PetDetailsDto toDto(PetEntity pet) {
        PetDetailsDto dto = new PetDetailsDto();

        dto.setId(pet.getId() != null ? pet.getId().intValue() : 0);
        dto.setName(pet.getName());
        dto.setSpecies(
                pet.getSpecies() != null
                        ? new SpeciesDto(pet.getSpecies().getId(), pet.getSpecies().getName())
                        : null);
        dto.setBirthdate(pet.getBirthdate());
        dto.setBreed(
                pet.getBreed() != null
                        ? new BreedDto(pet.getBreed().getId(), pet.getBreed().getName())
                        : null);
        dto.setColor(
                pet.getColor() != null
                        ? new ColorDto(pet.getColor().getId(), pet.getColor().getName())
                        : null);
        dto.setSex(pet.getSex() != null ? pet.getSex().name() : null);
        dto.setChipNumber(pet.getChipNumber());
        dto.setRegistered((Boolean.TRUE.equals(pet.getIsRegistered())));
        dto.setNeutered(Boolean.TRUE.equals(pet.getIsCastrated()));
        dto.setSpecialCharacteristics(pet.getSpecialNotes());
        dto.setHasExtraInvoice(Boolean.TRUE.equals(pet.getIsExtraInvoice()));
        dto.setArchived(!Boolean.TRUE.equals(pet.getIsActive()));

        dto.setFoundLocation(pet.getFoundLocation());
        dto.setAnimalReasonReceiveType(pet.getIntakeReason());
        dto.setFoundDate(pet.getDateFound());

        if (pet.getFinder() != null) {
            FinderEntity f = pet.getFinder();
            dto.setFinderId(f.getId());
            dto.setFinderName(joinNames(f.getFirstName(), f.getLastName()));
            dto.setFinderPhone(f.getPhone());
            dto.setFinderAddress(formatAddress(f.getStreet(), f.getHouseNumber(), f.getZipCode(), f.getCity()));
        }

        UnitEntity unit = pet.getUnit();
        if (unit != null) {
            SectionEntity section = unit.getSection();
            String sectionName = section != null ? section.getName() : null;
            String sectionShortName = section != null ? section.getShortName() : null;
            String locationName = null;
            String locationShortName = null;
            if (section != null && section.getLocation() != null) {
                locationName = section.getLocation().getName();
                locationShortName = section.getLocation().getShortName();
            }
            dto.setRoom(new UnitDto(
                    unit.getId(),
                    unit.getIsDefault(),
                    unit.getName(),
                    sectionName,
                    sectionShortName,
                    locationName,
                    locationShortName
            ));
        } else {
            dto.setRoom(null);
        }
        dto.setFoods(pet.getFoods() != null
                ? pet.getFoods().stream().map((food) -> new FoodDto(food.getId(), food.getName())).collect(Collectors.toList())
                : Collections.emptyList());

        dto.setMedications(pet.getMedications() != null
                ? pet.getMedications().stream().map((med) -> new MedicationDto(med.getId(), med.getName()))
                .collect(Collectors.toList())
                : Collections.emptyList());

        if (pet.getPlacementStatus() != null) {
            dto.setPlacementStatusId(pet.getPlacementStatus().getId());
            dto.setPlacementStatusName(pet.getPlacementStatus().getName());
        } else {
            dto.setPlacementStatusId(null);
            dto.setPlacementStatusName(null);
        }

        return dto;
    }

    private static String joinNames(String first, String last) {
        if (first == null && last == null)
            return null;
        if (first == null)
            return last;
        if (last == null)
            return first;
        return first + " " + last;
    }

    private static String formatAddress(String street, Integer number, Integer zip, String city) {
        StringBuilder sb = new StringBuilder();
        if (street != null)
            sb.append(street);
        if (number != null)
            sb.append(" ").append(number);
        if ((zip != null || city != null) && !sb.isEmpty())
            sb.append(", ");
        if (zip != null)
            sb.append(zip);
        if (city != null)
            sb.append(" ").append(city);
        return sb.toString().trim();
    }
}

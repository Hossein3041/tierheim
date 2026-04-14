package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.PetUpdateBodyDto;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.PlacementStatusEntity;
import solutions.sideklick.repository.PlacementStatusRepository;
import solutions.sideklick.types.PetSex;

public class PetUpdateMapper {

    public static void applyBasics(final PetEntity pet, final PetUpdateBodyDto body) {
        pet.setChipNumber(body.getChipNumber());
        pet.setSpecialNotes(body.getSpecialCharacteristics());

        if (body.getRegistered() != null) {
            pet.setIsRegistered(body.getRegistered());
        }
        if (body.getNeutered() != null) {
            pet.setIsCastrated(body.getNeutered());
        }
        if (body.getHasExtraInvoice() != null) {
            pet.setIsExtraInvoice(body.getHasExtraInvoice());
        }
        if (body.getArchived() != null) {
            pet.setIsActive(!body.getArchived());
        }

        if (body.getSex() != null) {
            try {
                pet.setSex(PetSex.valueOf(body.getSex()));
            } catch (IllegalArgumentException e) {
                pet.setSex(PetSex.UNKNOWN);
            }
        }
    }
}

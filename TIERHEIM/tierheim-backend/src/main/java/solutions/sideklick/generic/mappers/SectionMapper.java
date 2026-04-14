package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.*;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.SectionEntity;
import solutions.sideklick.entities.UnitEntity;

import java.util.*;

public class SectionMapper {

    public static SectionDetailDto toDetailDto(final SectionEntity section, final List<PetEntity> pets){

        SectionDetailDto sectionDetailDto = new SectionDetailDto();
        sectionDetailDto.setId(section.getId());
        sectionDetailDto.setSection(section.getName());
        sectionDetailDto.setShortSection(section.getShortName());

        Map<Long, UnitWithPetsDto> unitsMap = new LinkedHashMap<>();
        for(UnitEntity unit : section.getUnits()){
            UnitWithPetsDto unitsDto = new UnitWithPetsDto();
            unitsDto.setId(unit.getId());
            unitsDto.setName(unit.getName());
            unitsDto.setPets(new ArrayList<>());
            unitsMap.put(unit.getId(), unitsDto);
        }

        for(PetEntity pet : pets){
            Long unitId = pet.getUnit().getId();
            UnitWithPetsDto unitDto = unitsMap.get(unitId);

            PetInUnitDto petDto = new PetInUnitDto();
            petDto.setId(pet.getId());
            petDto.setChipNr(Optional.ofNullable(pet.getChipNumber()).orElse(""));
            petDto.setName(Optional.ofNullable(pet.getName()).orElse(""));
            petDto.setBreed(pet.getBreed() != null ? Optional.ofNullable(pet.getBreed().getName()).orElse("") : "");
            petDto.setImage(Optional.ofNullable(pet.getImage()).orElse(""));

            unitDto.getPets().add(petDto);

        }

        List<UnitWithPetsDto> resultUnits = new ArrayList<>();
        for(Long key : unitsMap.keySet()){
            resultUnits.add(unitsMap.get(key));
        }

        sectionDetailDto.setUnits(resultUnits);
        return sectionDetailDto;
    }
}

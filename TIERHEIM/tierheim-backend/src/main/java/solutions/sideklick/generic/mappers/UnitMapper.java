package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.UnitDto;
import solutions.sideklick.dtos.UnitsBySectionDto;
import solutions.sideklick.entities.UnitEntity;

import java.util.ArrayList;
import java.util.List;

public class UnitMapper {

    public static UnitDto from(UnitEntity unit) {
        UnitDto dto = new UnitDto();
        dto.setId(unit.getId());
        dto.setDefault(Boolean.TRUE.equals(unit.getIsDefault()));
        dto.setName(unit.getName());
        if (unit.getSection() != null) {
            dto.setSection(unit.getSection().getName());
            dto.setSectionShortName(unit.getSection().getShortName());

            if (unit.getSection().getLocation() != null) {
                dto.setLocation(unit.getSection().getLocation().getName());
                dto.setLocationShortName(unit.getSection().getLocation().getShortName());
            }
        }
        return dto;
    }

    public static List<UnitDto> from(List<UnitEntity> units) {
        return units.stream()
                .map(UnitMapper::from)
                .toList();
    }

    public static List<UnitsBySectionDto> toUnitsBySectionDto(final List<UnitEntity> units) {
        List<UnitsBySectionDto> unitsBySectionDto = new ArrayList<>();
        for(UnitEntity unit : units) {
            UnitsBySectionDto dto = new UnitsBySectionDto();
            dto.setId(unit.getId());
            dto.setName(unit.getName());
            unitsBySectionDto.add(dto);
        }
        return unitsBySectionDto;
    }
}
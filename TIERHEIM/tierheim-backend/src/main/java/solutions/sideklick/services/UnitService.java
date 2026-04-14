package solutions.sideklick.services;

import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import solutions.sideklick.dtos.UnitDto;
import solutions.sideklick.dtos.UnitsBySectionDto;
import solutions.sideklick.entities.UnitEntity;
import solutions.sideklick.generic.mappers.UnitMapper;
import solutions.sideklick.repository.SectionRepository;
import solutions.sideklick.repository.UnitRepository;

import java.util.List;

@Singleton
public class UnitService {

    private final Logger logger = LoggerFactory.getLogger(UnitService.class);

    private final UnitRepository unitRepository;
    private final SectionRepository sectionRepository;

    public UnitService(final UnitRepository unitRepository, final SectionRepository sectionRepository) {
        this.unitRepository = unitRepository;
        this.sectionRepository = sectionRepository;
    }

    public List<UnitDto> getUnits() {
        List<UnitEntity> units = unitRepository.findAllWithJoins();
        List<UnitDto> dtos = UnitMapper.from(units);
        return dtos;
    }

    @Transactional
    public List<UnitsBySectionDto> getUnitsBySection(Long sectionId) {
        if (sectionId == null) {
            throw new IllegalArgumentException("Section ID must not be null");
        }
        boolean sectionExists = sectionRepository.existsById(sectionId);
        if(!sectionExists)
            throw new IllegalArgumentException("Section with id " + sectionId + " does not exist");

        List<UnitEntity> units = unitRepository.findBySectionIdOrderByIdAsc(sectionId);
        logger.error("findBySectionId({}) returned {} units", sectionId, units.size());

        if(units.isEmpty()){
            logger.warn("No units found for section with ID {}", sectionId);
            return List.of();
        }

        List<UnitsBySectionDto> dtos = UnitMapper.toUnitsBySectionDto(units);
        logger.debug("Found {} units for section ID {}", dtos.size(), sectionId);
        return dtos;
    }

    @Transactional
    public boolean sectionExists(long sectionId) {
        return sectionRepository.existsById(sectionId);
    }
}


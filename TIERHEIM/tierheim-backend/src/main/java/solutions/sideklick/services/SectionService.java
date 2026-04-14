package solutions.sideklick.services;

import io.micronaut.data.model.Sort;
import jakarta.inject.Singleton;
import solutions.sideklick.dtos.SectionDetailDto;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.SectionEntity;
import solutions.sideklick.repository.PetRepository;
import solutions.sideklick.repository.SectionRepository;
import solutions.sideklick.generic.mappers.SectionMapper;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Singleton
public class SectionService {
    private final SectionRepository sectionRepository;
    private final PetRepository petRepository;

    public SectionService(SectionRepository sectionRepository, PetRepository petRepository){
        this.sectionRepository = sectionRepository;
        this.petRepository = petRepository;
    }

    public SectionDetailDto getSpecificSection(Long sectionId){
        SectionEntity section = sectionRepository.findByIdWithUnits(sectionId).orElseThrow(() -> new NoSuchElementException("Section not found"));
        List<PetEntity> pets = petRepository.findByUnitSectionOrderById(section);
        return SectionMapper.toDetailDto(section, pets);
    }
}

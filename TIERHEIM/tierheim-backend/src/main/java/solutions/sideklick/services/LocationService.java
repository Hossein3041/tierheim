package solutions.sideklick.services;

import jakarta.inject.Singleton;
import solutions.sideklick.dtos.CategorizedLocationsOverviewDto;
import solutions.sideklick.dtos.LocationDto;
import solutions.sideklick.dtos.LocationSectionPet;
import solutions.sideklick.dtos.LocationsOverviewDto;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.PetSpeciesEntity;
import solutions.sideklick.generic.mappers.LocationMapper;
import solutions.sideklick.repository.LocationRepository;
import solutions.sideklick.repository.PetRepository;
import solutions.sideklick.repository.PetSpeciesRepository;
import solutions.sideklick.repository.SectionRepository;
import solutions.sideklick.entities.SectionEntity;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.LinkedHashMap;

@Singleton
public class LocationService {

    private final PetRepository petRepository;
    private final PetSpeciesRepository petSpeciesRepository;
    private final SectionRepository sectionRepository;

    public LocationService(final PetRepository petRepository, final PetSpeciesRepository petSpeciesRepository, final SectionRepository sectionRepository) {
        this.petRepository = petRepository;
        this.petSpeciesRepository = petSpeciesRepository;
        this.sectionRepository = sectionRepository;
    }

    public CategorizedLocationsOverviewDto getLocationsOverview(){
        List<PetEntity> pets = petRepository.findByIsActiveTrue();
        List<SectionEntity> allSections = sectionRepository.findAllWithLocation();
        List<String> allSpecies = petSpeciesRepository.findAll().stream()
                    .sorted(Comparator.comparing(PetSpeciesEntity::getOrderNumber))
                .map(PetSpeciesEntity::getName).collect(Collectors.toList());
        return LocationMapper.toOverviewDto(pets, allSpecies, allSections);
    }
}

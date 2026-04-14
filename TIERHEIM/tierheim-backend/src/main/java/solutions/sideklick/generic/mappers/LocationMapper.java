package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.*;
import solutions.sideklick.entities.LocationEntity;
import solutions.sideklick.entities.SectionEntity;
import solutions.sideklick.entities.PetEntity;

import java.util.*;

public class LocationMapper {

    public static CategorizedLocationsOverviewDto toOverviewDto(final List<PetEntity> pets, final List<String> allSpecies, final List<SectionEntity> allSections){

        final Map<Long, LocationDto> locationMap = new LinkedHashMap<>();

        for(final SectionEntity section : allSections){

            final LocationEntity location = section.getLocation();
            final Long locationId = (location != null) ? location.getId() : 0L;
            final String locationName =  (location != null) ? location.getName() : "";

            LocationDto locationDto = locationMap.get(locationId);
            if(locationDto == null) {
                locationDto = createLocationDto(locationId, locationName);
                locationMap.put(locationId, locationDto);
            }

            SectionDto sectionDto = findSectionById(locationDto.getSections(), section.getId());
            if(sectionDto == null) {
                sectionDto = createSectionDto(section.getId(), section.getName(), section.getMaxPets());
                locationDto.getSections().add(sectionDto);
            }
        }

        for(final PetEntity pet : pets){

            final var sectionOpt = Optional.ofNullable(pet.getUnit()).map(u -> u.getSection());
            final var locationOpt = sectionOpt.map(section -> section.getLocation());

            final Long sectionId = sectionOpt.map(SectionEntity::getId).orElse(null);
            final Long locationId = locationOpt.map(LocationEntity::getId).orElse(null);

            if(sectionId == null || locationId == null) {
                continue;
            }

            LocationDto locationDto = locationMap.get(locationId);

            if(locationDto == null) {
                locationDto = createLocationDto(locationId, locationOpt.map(l -> l.getName()).orElse(""));
                locationMap.put(locationId, locationDto);
            }

            SectionDto sectionDto = findSectionById(locationDto.getSections(), sectionId);
            if(sectionDto == null) {
                sectionDto = createSectionDto(sectionId, sectionOpt.map(SectionEntity::getName).orElse(""), sectionOpt.map(SectionEntity::getMaxPets).orElse(0));
                locationDto.getSections().add(sectionDto);
            }

            final PetSummaryDto petDto = createPetSummaryDto(pet);
            addPetToSection(sectionDto, petDto, locationDto);
        }

        LocationsOverviewDto locationsOverviewDto = new LocationsOverviewDto();

        List<LocationDto> sortedLocations = new ArrayList<>(locationMap.values());
        sortedLocations.sort((a, b) -> {
            if(a.getId() == 6L) return -1;
            if(b.getId() == 6L) return 1;
            return a.getId().compareTo(b.getId());
        });

        locationsOverviewDto.setLocations(sortedLocations);

        return categorizePetsBySpeciesIncludingEmpty(locationsOverviewDto, allSpecies);
    }

    private static LocationDto createLocationDto(Long id, String name){
        LocationDto locationDto = new LocationDto();
        locationDto.setId(id);
        locationDto.setName(name);
        locationDto.setCurrentPetCount(0);
        locationDto.setSections(new ArrayList<>());
        return locationDto;
    }

    private static SectionDto createSectionDto(Long id, String name, int maxPetCount){
        SectionDto sectionDto = new SectionDto();
        sectionDto.setId(id);
        sectionDto.setName(name);
        sectionDto.setMaxPetCount(maxPetCount);
        sectionDto.setCurrentPetCount(0);
        sectionDto.setPets(new ArrayList<>());
        return sectionDto;
    }

    private static PetSummaryDto createPetSummaryDto(PetEntity pet){
        PetSummaryDto petDto = new PetSummaryDto();
        petDto.setPetId(pet.getId());
        petDto.setImage(Objects.requireNonNullElse(pet.getImage(), ""));
        petDto.setName(Objects.requireNonNullElse(pet.getName(), ""));
        String speciesName = Optional.ofNullable(pet.getSpecies()).map(sp -> sp.getName()).orElse("Unbekannt");
        petDto.setSpecies(speciesName);
        return petDto;
    }

    private static CategorizedLocationsOverviewDto categorizePetsBySpeciesIncludingEmpty(final LocationsOverviewDto locationsOverviewDto, final List<String> allSpecies){

        Map<String, LocationsOverviewDto> categorizedBySpecies = new LinkedHashMap<>();
        for(String species : allSpecies) {
            categorizedBySpecies.put(species, deepCopySkeleton(locationsOverviewDto));
        }

        for(LocationDto location : locationsOverviewDto.getLocations()){
            for(SectionDto section : location.getSections()){
                for(PetSummaryDto pet :  section.getPets()){

                    String species = pet.getSpecies();
                    LocationsOverviewDto speciesLocations = categorizedBySpecies.computeIfAbsent(species, k -> deepCopySkeleton(locationsOverviewDto));

                    LocationDto targetLocation = getOrCreateLocation(toIdMap(speciesLocations.getLocations()), location);

                    SectionDto targetSection = findSectionById(targetLocation.getSections(), section.getId());
                    if(targetSection == null) {
                        targetSection = createSectionDto(section.getId(), section.getName(), section.getMaxPetCount());
                        targetLocation.getSections().add(targetSection);
                    }

                    addPetToSection(targetSection, pet, targetLocation);
                }
            }
        }

        addEmptySpecies(categorizedBySpecies, allSpecies);

        return new CategorizedLocationsOverviewDto(categorizedBySpecies);
    }

    private static LocationsOverviewDto deepCopySkeleton(LocationsOverviewDto source) {

        LocationsOverviewDto copy = new LocationsOverviewDto();
        List<LocationDto> locations = new ArrayList<>();

        for(LocationDto location : source.getLocations()) {

            LocationDto locationCopy = createLocationDto(location.getId(), location.getName());
            for(SectionDto section : location.getSections()) {
                SectionDto sectionCopy = createSectionDto(section.getId(), section.getName(), section.getMaxPetCount());
                locationCopy.getSections().add(sectionCopy);
            }
            locations.add(locationCopy);
        }
        copy.setLocations(locations);
        return copy;
    }

    private static Map<Long, LocationDto> toIdMap(List<LocationDto> locations) {
        Map<Long, LocationDto> map = new LinkedHashMap<>();
        for(LocationDto location : locations) {
            map.put(location.getId(), location);
        }
        return map;
    }

    private static LocationDto getOrCreateLocation(final Map<Long, LocationDto> locationMap, final LocationDto location){
        LocationDto speciesLocation = locationMap.get(location.getId());
        if(speciesLocation == null){
            speciesLocation = createLocationDto(location.getId(), location.getName());
            locationMap.put(location.getId(), speciesLocation);
        }
        return speciesLocation;
    }

    private static SectionDto findSectionById(List<SectionDto> sections, Long sectionId){
        for(SectionDto section : sections){
            if(section.getId().equals(sectionId)){
                return section;
            }
        }
        return null;
    }

    private static void addPetToSection(SectionDto sectionDto, PetSummaryDto petDto, LocationDto locationDto){
        sectionDto.getPets().add(petDto);
        sectionDto.setCurrentPetCount(sectionDto.getCurrentPetCount() + 1);
        locationDto.setCurrentPetCount(locationDto.getCurrentPetCount() + 1);
    }

    private static Map<String, LocationsOverviewDto> createCategorizedMap(Map<String, Map<Long, LocationDto>> speciesLocationMap){
        Map<String, LocationsOverviewDto> categorizedBySpecies = new HashMap<>();
        for(Map.Entry<String, Map<Long, LocationDto>> entry : speciesLocationMap.entrySet()){
            String species = entry.getKey();
            Map<Long, LocationDto> mapByLocation = entry.getValue();

            LocationsOverviewDto locationsDto = new LocationsOverviewDto();
            locationsDto.setLocations(new ArrayList<>(mapByLocation.values()));
            categorizedBySpecies.put(species, locationsDto);
        }
        return categorizedBySpecies;
    }

    private static void addEmptySpecies(Map<String, LocationsOverviewDto> categorizedBySpecies, List<String> allSpecies) {
        for(String species : allSpecies) {
            if(!categorizedBySpecies.containsKey(species)){
                LocationsOverviewDto empty = new LocationsOverviewDto();
                empty.setLocations(new ArrayList<>());
                categorizedBySpecies.put(species, empty);
            }
        }
    }
}
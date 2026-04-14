package solutions.sideklick.services;

import jakarta.inject.Singleton;
import java.util.List;

import solutions.sideklick.dtos.*;
import solutions.sideklick.entities.*;
import solutions.sideklick.generic.mappers.PetMetadataMapper;
import solutions.sideklick.repository.*;

@Singleton
public class PetMetadataService {

  private final ColorRepository colorRepository;

  private final BreedRepository breedRepository;

  private final PetSpeciesRepository petSpeciesRepository;

  private final PetFoodRepository petFoodRepository;

  private final PetMedicationRepository petMedicationRepository;

  private final PlacementStatusRepository placementStatusRepository;

  public PetMetadataService(final ColorRepository colorRepository, final BreedRepository breedRepository,
      final PetSpeciesRepository petSpeciesRepository, final PetFoodRepository petFoodRepository,
      final PetMedicationRepository petMedicationRepository, final PlacementStatusRepository placementStatusRepository) {
    this.colorRepository = colorRepository;
    this.breedRepository = breedRepository;
    this.petSpeciesRepository = petSpeciesRepository;
    this.petFoodRepository = petFoodRepository;
    this.petMedicationRepository = petMedicationRepository;
    this.placementStatusRepository = placementStatusRepository;
  }

  public List<SpeciesDto> getAllSpecies() {
    final List<PetSpeciesEntity> speciesList = this.petSpeciesRepository.findAll();
    final List<SpeciesDto> speciesDtos = PetMetadataMapper.mapToSpeciesDto(speciesList);
    return speciesDtos;
  }

  public List<BreedDto> getAllBreeds() {
    final List<PetBreedEntity> breeds = this.breedRepository.findAll();
    final List<BreedDto> breedDtos = PetMetadataMapper.mapBreedsToDto(breeds);
    return breedDtos;
  }

  public List<ColorDto> getAllColors() {
    final List<PetColorEntity> colors = this.colorRepository.findAll();
    final List<ColorDto> colorDtos = PetMetadataMapper.mapToColorDto(colors);
    return colorDtos;
  }

  public List<MedicationDto> getAllMedications() {
    final List<PetMedicationEntity> medications = petMedicationRepository.findAll();
    final List<MedicationDto> medicationDtos = PetMetadataMapper.mapMedicationsToDto(medications);
    return medicationDtos;
  }

  public List<FoodDto> getAllFoods() {
    final List<PetFoodEntity> medications = petFoodRepository.findAll();
    final List<FoodDto> medicationDtos = PetMetadataMapper.mapFoodsToDto(medications);
    return medicationDtos;
  }

  public List<PlacementStatusDto> getAllPlacementStatuses() {
    return placementStatusRepository.findAllByActiveTrueOrderByOrderNumberAsc().stream().map(ps -> new PlacementStatusDto(ps.getId(), ps.getName(), ps.getDisplayName())).toList();
  }

  public void applyPlacementStatus(PetEntity pet, PetUpdateBodyDto body) {
    if (body.getPlacementStatusId() != null) {
      PlacementStatusEntity ps = placementStatusRepository.findById(body.getPlacementStatusId())
              .orElseThrow(() -> new IllegalArgumentException(
                      "Unbekannter Placement-Status: ID " + body.getPlacementStatusId()
              ));
      pet.setPlacementStatus(ps);
    }
  }
}

package solutions.sideklick.generic.mappers;

import solutions.sideklick.dtos.BreedDto;
import solutions.sideklick.dtos.ColorDto;
import solutions.sideklick.dtos.FoodDto;
import solutions.sideklick.dtos.MedicationDto;
import solutions.sideklick.dtos.SpeciesDto;
import solutions.sideklick.entities.PetBreedEntity;
import solutions.sideklick.entities.PetColorEntity;
import solutions.sideklick.entities.PetFoodEntity;
import solutions.sideklick.entities.PetMedicationEntity;
import solutions.sideklick.entities.PetSpeciesEntity;

import java.util.ArrayList;
import java.util.List;

public class PetMetadataMapper {

  public static List<ColorDto> mapToColorDto(List<PetColorEntity> colors) {
    List<ColorDto> colorDtos = new ArrayList<>();
    for (PetColorEntity color : colors) {
      colorDtos.add(new ColorDto(color.getId(), color.getName()));
    }
    return colorDtos;
  }

  public static List<SpeciesDto> mapToSpeciesDto(List<PetSpeciesEntity> speciesList) {
    List<SpeciesDto> speciesDtos = new ArrayList<>();
    for (PetSpeciesEntity species : speciesList) {
      speciesDtos.add(new SpeciesDto(species.getId(), species.getName()));
    }
    return speciesDtos;
  }

  public static List<BreedDto> mapBreedsToDto(List<PetBreedEntity> petBreeds) {
    List<BreedDto> breedDtos = new ArrayList<>();
    for (PetBreedEntity breed : petBreeds) {
      breedDtos.add(new BreedDto(breed.getId(), breed.getName()));
    }
    return breedDtos;
  }

  public static List<MedicationDto> mapMedicationsToDto(List<PetMedicationEntity> petMedications) {
    List<MedicationDto> medicationDtos = new ArrayList<>();
    for (PetMedicationEntity medication : petMedications) {
      medicationDtos.add(new MedicationDto(medication.getId(), medication.getName()));
    }
    return medicationDtos;
  }

  public static List<FoodDto> mapFoodsToDto(List<PetFoodEntity> petFoods) {
    List<FoodDto> foodDtos = new ArrayList<>();
    for (PetFoodEntity food : petFoods) {
      foodDtos.add(new FoodDto(food.getId(), food.getName()));
    }
    return foodDtos;
  }
}

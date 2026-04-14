package solutions.sideklick.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import java.util.List;
import solutions.sideklick.dtos.*;
import solutions.sideklick.services.PetMetadataService;

@Controller
public class PetMetaController {

  private final PetMetadataService petMetadataService;

  public PetMetaController(final PetMetadataService petMetadataService) {
    this.petMetadataService = petMetadataService;
  }

  @Get("${micronaut.base.path}/private/pet/species")
  public HttpResponse<List<SpeciesDto>> getAllSpecies() {
    return HttpResponse.ok(petMetadataService.getAllSpecies());
  }

  @Get("${micronaut.base.path}/private/pet/breeds")
  public HttpResponse<List<BreedDto>> getAllBreeds() {
    return HttpResponse.ok(petMetadataService.getAllBreeds());
  }

  @Get("${micronaut.base.path}/private/pet/colors")
  public HttpResponse<List<ColorDto>> getAllColors() {
    return HttpResponse.ok(petMetadataService.getAllColors());
  }

  @Get("${micronaut.base.path}/private/pet/medications")
  public HttpResponse<List<MedicationDto>> getAllMedications() {
    return HttpResponse.ok(petMetadataService.getAllMedications());
  }

  @Get("${micronaut.base.path}/private/pet/foods")
  public HttpResponse<List<FoodDto>> getAllFoods() {
    return HttpResponse.ok(petMetadataService.getAllFoods());
  }

  @Get("${micronaut.base.path}/private/pet/placement-status")
  public HttpResponse<List<PlacementStatusDto>> getAllPlacementStatuses() {
    return HttpResponse.ok(petMetadataService.getAllPlacementStatuses());
  }
}

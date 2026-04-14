package solutions.sideklick.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import solutions.sideklick.dtos.FoodDto;
import solutions.sideklick.dtos.MedicationDto;
import solutions.sideklick.services.SuggestionService;

import java.util.List;

@Controller
public class SuggestionController {

    private final SuggestionService suggestionService;

    public SuggestionController(final SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }

    @Get("${micronaut.base.path}/private/suggests/foods")
    public HttpResponse<List<FoodDto>> getFoodSuggestions() {
        return HttpResponse.ok(suggestionService.getAllFoods());
    }


    @Get("${micronaut.base.path}/private/suggest/medications")
    public HttpResponse<List<MedicationDto>> getMedicationSuggestions() {
        return HttpResponse.ok(suggestionService.getAllMedications());
    }
}

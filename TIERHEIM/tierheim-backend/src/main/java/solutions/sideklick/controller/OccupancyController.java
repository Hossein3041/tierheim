package solutions.sideklick.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import jakarta.validation.constraints.NotNull;
import java.util.LinkedHashMap;
import java.util.List;
import solutions.sideklick.authentication.dtos.error.ErrorDto;
import solutions.sideklick.dtos.CategorizedLocationsOverviewDto;
import solutions.sideklick.dtos.SectionDetailDto;
import solutions.sideklick.dtos.UnitDto;
import solutions.sideklick.services.LocationService;
import solutions.sideklick.services.SectionService;
import solutions.sideklick.services.UnitService;

@Controller
public class OccupancyController {

    private final UnitService unitService;
    private final LocationService locationService;
    private final SectionService sectionService;

    public OccupancyController(UnitService unitService, LocationService locationService, SectionService sectionService) {
        this.unitService = unitService;
        this.locationService = locationService;
        this.sectionService = sectionService;
    }

    @Get("${micronaut.base.path}/private/pet/units") // TODO RENAME AGAIN
    public HttpResponse<List<UnitDto>> getUnits() {
        return HttpResponse.ok(unitService.getUnits());
    }

    @Get("${micronaut.base.path}/private/occupancy/locations")
    public HttpResponse<?> getLocationsOverview() {
        try {
            CategorizedLocationsOverviewDto dto = locationService.getLocationsOverview();
            return HttpResponse.ok(dto);
        } catch (Exception e) {
            return HttpResponse.serverError(new ErrorDto("Unexpected error while retrieving location data"));
        }
    }

    @Get("${micronaut.base.path}/private/occupancy/sections/{id}")
    public HttpResponse<?> getSectionDetails( @PathVariable("id") @NotNull Long sectionId){
        try {
            SectionDetailDto dto = sectionService.getSpecificSection(sectionId);
             if(dto == null){
                 return HttpResponse.notFound(new ErrorDto("Section with ID " + sectionId + " not found"));
             }
             return HttpResponse.ok(dto);
        } catch (Exception e) {
            return HttpResponse.serverError(new ErrorDto("Unexpected error while fetching the section"));
        }
    }
}


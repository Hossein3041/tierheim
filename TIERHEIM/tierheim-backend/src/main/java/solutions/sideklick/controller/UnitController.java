package solutions.sideklick.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import solutions.sideklick.dtos.UnitDto;
import solutions.sideklick.dtos.UnitsBySectionDto;
import solutions.sideklick.services.UnitService;

import java.util.List;
import java.util.Map;

@Controller
public class UnitController {

  private final Logger logger = LoggerFactory.getLogger(UnitController.class);
  private final UnitService unitService;

  public UnitController(UnitService unitService) {
    this.unitService = unitService;
  }

  @Get("${micronaut.base.path}/private/getUnits")
  public HttpResponse<List<UnitDto>> getUnits() {
    return HttpResponse.ok(unitService.getUnits());
  }

  @Get("${micronaut.base.path}/private/getUnits/{sectionId}")
  public HttpResponse<?> getUnitsBySection(@PathVariable("sectionId") final Long sectionId) {
    boolean sectionExists = unitService.sectionExists(sectionId);
    if(!sectionExists) {
      return HttpResponse.notFound(Map.of("message" ,"Section with ID " + sectionId + " not found"));
    }
    List<UnitsBySectionDto> units = unitService.getUnitsBySection(sectionId);
    return HttpResponse.ok(units);
  }
}


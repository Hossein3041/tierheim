package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Serdeable
public class LocationsOverviewDto {

    private List<LocationDto> locations;
}

package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Serdeable
@AllArgsConstructor
@NoArgsConstructor
public class CategorizedLocationsOverviewDto {

    private Map<String, LocationsOverviewDto> categorizedPets;

}

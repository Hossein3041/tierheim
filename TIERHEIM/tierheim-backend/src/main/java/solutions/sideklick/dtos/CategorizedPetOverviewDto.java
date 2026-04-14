package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Serdeable
public class CategorizedPetOverviewDto {

    private Map<String, List<PetOverviewDto>> categorizedPets;

}

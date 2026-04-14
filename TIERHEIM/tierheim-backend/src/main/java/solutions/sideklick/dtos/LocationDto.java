package solutions.sideklick.dtos;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Serdeable
public class LocationDto {

    private Long id;
    private String name;
    private String shortName;
    private int currentPetCount;
    private List<SectionDto> sections;
}

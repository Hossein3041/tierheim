package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Serdeable
public class SpeciesDto {

    private long id;
    private String name;
}

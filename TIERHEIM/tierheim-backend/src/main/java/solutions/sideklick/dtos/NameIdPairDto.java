package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Serdeable
@AllArgsConstructor
@NoArgsConstructor
public class NameIdPairDto {

    private String id;
    private String name;
}

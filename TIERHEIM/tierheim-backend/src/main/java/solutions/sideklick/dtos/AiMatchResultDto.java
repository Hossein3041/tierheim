package solutions.sideklick.dtos;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Serdeable
@Introspected
@AllArgsConstructor

public class AiMatchResultDto {
    private String id;
    private String name;
}

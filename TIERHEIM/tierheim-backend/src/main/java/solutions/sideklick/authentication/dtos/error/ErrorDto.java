package solutions.sideklick.authentication.dtos.error;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Serdeable
public class ErrorDto {
    private String message;
}

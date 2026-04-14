package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.*;

@Serdeable
@Getter
@AllArgsConstructor
public class CheckAppointmentResponse {
    private final Long id;
    private final boolean checked;
}

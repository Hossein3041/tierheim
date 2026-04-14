package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.*;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CheckAppointmentRequest {
    private Boolean checked;
}

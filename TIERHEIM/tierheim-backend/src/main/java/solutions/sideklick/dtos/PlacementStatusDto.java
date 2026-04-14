package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Serdeable
public class PlacementStatusDto {
    private Long id;
    private String name;
    private String displayName;
}

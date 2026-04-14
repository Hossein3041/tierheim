package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Serdeable
@AllArgsConstructor
@NoArgsConstructor

public class UnitsBySectionDto {

    private Long id;
    private String name;

}

package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Serdeable
public class UnitDto {

    private Long id;
    private boolean isDefault;
    private String name;
    private String section;
    private String sectionShortName;
    private String location;
    private String locationShortName;
}
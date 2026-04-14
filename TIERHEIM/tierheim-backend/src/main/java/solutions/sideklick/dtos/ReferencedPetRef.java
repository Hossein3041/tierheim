package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReferencedPetRef {

    private Long petId;
    private String petName;
    private String petBreed;
    private String petImage;
}

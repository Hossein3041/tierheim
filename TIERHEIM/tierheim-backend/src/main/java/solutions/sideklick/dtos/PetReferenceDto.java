package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PetReferenceDto {

    private Long petId;
    private String petName;
    private String petBreed;
    private String petImage;

    @JsonIgnore
    private String speciesName;
}

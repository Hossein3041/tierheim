package solutions.sideklick.dtos;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Serdeable
public class PetSummaryDto {

    private Long petId;
    private String chipNumber;
    private String name;
    private String breed;
    private String image;
    private String species;
}

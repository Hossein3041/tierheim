package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Serdeable
@AllArgsConstructor
@NoArgsConstructor
public class LocationSectionPet {

    private  Long petId;
    private  String petImage;
    private  String petName;
    private  Long unitId;
    private  String unitName;
    private  Long sectionId;
    private  String sectionName;
    private  Integer sectionMaxPets;
    private  Long locationId;
    private  String locationName;
}

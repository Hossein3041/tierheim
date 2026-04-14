package solutions.sideklick.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDate;
import java.util.List;

import lombok.*;
import solutions.sideklick.types.PlacementStatus;

@Getter
@Setter
@Serdeable
@NoArgsConstructor
@AllArgsConstructor
public class PetUpdateBodyDto {

    private Long speciesId;
    private String birthdate;
    private Long breedId;
    private Long colorId;
    private String sex;
    private Long finderId;
    private String finderPhone;
    private Long unitId;

    private List<NameIdPairDto> foods;
    private List<NameIdPairDto> medications;

    private String chipNumber;
    private Boolean registered;
    private Boolean neutered;
    private String specialCharacteristics;

    private Boolean hasExtraInvoice;
    private Boolean archived;

    private Long placementStatusId;
}

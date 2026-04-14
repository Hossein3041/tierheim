package solutions.sideklick.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Serdeable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentItemDto {

    private Long id;

    @JsonIgnore
    private Long appointmentTypeId;
    private String appointmentType;
    private Long appointmentCategoryId;
    private String appointmentCategory;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentDescription;
    private boolean checked;
    private PetReferenceDto referencedPet;

    private String checkedAt;
    private String checkedBy;
}

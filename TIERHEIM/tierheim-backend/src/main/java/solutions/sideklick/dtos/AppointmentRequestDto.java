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
public class AppointmentRequestDto {
    private String appointmentType;
    private String appointmentCategory;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentDescription;
    private Boolean checked;
    private ReferencedPetRef referencedPet;
}

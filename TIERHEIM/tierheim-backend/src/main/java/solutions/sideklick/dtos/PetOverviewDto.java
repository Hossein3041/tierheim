package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import solutions.sideklick.types.AnimalReasonReceiveType;

import java.time.LocalDate;

@Getter
@Setter
@Serdeable
public class PetOverviewDto {

    private Long id;
    private String name;
    private String breed;
    private String image;
    private String chipNumber;
    private String locationUnit;
    private boolean specialNote;
    private String locationShortName;
    private String sectionShortName;
    private String placementStatus;
    private Long placementStatusId;
    private String animalReasonType;
    private LocalDate foundDate;
    private String primaryBadge;
    private boolean hasAttention;
}

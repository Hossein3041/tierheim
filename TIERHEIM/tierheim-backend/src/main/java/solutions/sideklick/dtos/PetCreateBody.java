package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Getter;
import lombok.Setter;
import solutions.sideklick.types.AnimalReasonReceiveType;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Serdeable
public class PetCreateBody {

    private String name;
    private String species;
    private String birthdate;
    private String breed;
    private String color;
    private String sex;
    private String finderName;
    private String foundLocation;
    private String foundDate;
    private String finderAddress;
    private String finderPhone;
    private String room; // TODO REMOVE FROM NEXTCLOUD SCRIPTS AND THEN REMOVE HERE
    private List<String> foods; // TODO REMOVE FROM NEXTCLOUD SCRIPTS AND THEN REMOVE HERE
    private List<String> medications; // TODO REMOVE FROM NEXTCLOUD SCRIPTS AND THEN REMOVE HERE
    private String chipNumber;
    private boolean isRegistered;
    private boolean isNeutered;
    private String specialCharacteristics;
    private boolean hasExtraInvoice;
    private boolean isArchived;
    private AnimalReasonReceiveType intakeReason;
}

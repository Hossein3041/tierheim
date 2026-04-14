package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDate;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import solutions.sideklick.types.AnimalReasonReceiveType;

@Getter
@Setter
@Serdeable
public class PetDetailsDto {

  private int id;
  private String name;
  private SpeciesDto species;
  private LocalDate birthdate;
  private BreedDto breed;
  private ColorDto color;
  private String sex;
  private Long finderId;
  private String finderName;
  private String foundLocation;
  private LocalDate foundDate;
  private String finderAddress;
  private String finderPhone;
  private UnitDto room;
  private List<FoodDto> foods;
  private List<MedicationDto> medications;
  private String chipNumber;
  private boolean isRegistered;
  private boolean isNeutered;
  private String specialCharacteristics;
  private boolean hasExtraInvoice;
  private boolean isArchived;
  private AnimalReasonReceiveType animalReasonReceiveType;
  private Long placementStatusId;
  private String placementStatusName;
}
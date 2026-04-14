package solutions.sideklick.entities;

import io.micronaut.data.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import lombok.*;
import org.hibernate.annotations.Type;
import solutions.sideklick.types.AnimalReasonReceiveType;
import solutions.sideklick.types.PetSex;
import solutions.sideklick.types.PlacementStatus;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pets")
public class PetEntity {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isActive = true;
    private String name;
    private String chipNumber;
    private String image;
    private LocalDate birthdate;
    private Boolean isRegistered = false;
    private Boolean isCastrated = false;
    private String foundLocation;
    private LocalDate dateFound;
    private Boolean isExtraInvoice = false;
    private String specialNotes;

    @Enumerated(EnumType.STRING)
    private PetSex sex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placement_status_id")
    private PlacementStatusEntity placementStatus;

/*    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AnimalReasonReceiveType animalReasonReceiveType;*/

    @ManyToOne
    private PetSpeciesEntity species;

    @ManyToOne
    private PetBreedEntity breed;

    @ManyToOne
    private PetColorEntity color;

    @ManyToOne
    private FinderEntity finder;

    @ManyToOne
    private UnitEntity unit;

    @ManyToMany
    @JoinTable(
            name = "pet_food_links",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )    private List<PetFoodEntity> foods;

    @ManyToMany
    @JoinTable(
            name = "pet_medication_links",
            joinColumns = @JoinColumn(name = "pet_id"),
            inverseJoinColumns = @JoinColumn(name = "medication_id")
    )
    @Relation(Relation.Kind.MANY_TO_MANY)
    private List<PetMedicationEntity> medications;

    @Enumerated(EnumType.STRING)
    @Column(name = "intake_reason")
    private AnimalReasonReceiveType intakeReason;
}
package solutions.sideklick.entities;

import io.micronaut.data.annotation.*;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pet_medications")
public class PetMedicationEntity {

    public PetMedicationEntity(String name) {
        this.name = name;
    }

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "medications")
     private List<PetEntity> pets;
}
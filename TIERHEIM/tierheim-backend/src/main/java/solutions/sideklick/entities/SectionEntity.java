package solutions.sideklick.entities;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.*;
import lombok.*;

import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "sections")
public class SectionEntity {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String shortName;

    private Integer maxPets;

    @ManyToOne
    private LocationEntity location;

    @OneToMany(mappedBy = "section", fetch = FetchType.LAZY)
    private List<UnitEntity> units = new ArrayList<>();
}

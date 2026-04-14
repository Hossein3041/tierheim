package solutions.sideklick.entities;

import io.micronaut.data.annotation.*;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "units")
public class UnitEntity {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Boolean isDefault = false;

    @ManyToOne
    private SectionEntity section;
}
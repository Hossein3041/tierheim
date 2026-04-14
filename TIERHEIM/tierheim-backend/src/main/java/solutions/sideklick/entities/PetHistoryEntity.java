package solutions.sideklick.entities;

import io.micronaut.data.annotation.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedEntity("pet_histories")
public class PetHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate date;
    private LocalTime time;

    @Relation(Relation.Kind.MANY_TO_ONE)
    private PetEntity pet;
}

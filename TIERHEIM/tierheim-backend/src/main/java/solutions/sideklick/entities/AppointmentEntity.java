package solutions.sideklick.entities;

import io.micronaut.data.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import lombok.*;


import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class AppointmentEntity {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalTime time;
    private String notes;

    @ManyToOne
    private AppointmentTypeEntity type;

    @ManyToOne
    private AppointmentCategoryEntity category;

    @ManyToOne
    private PetEntity pet;

    @Column(name = "checked", nullable = false)
    private boolean checked = false;

    @Column(name = "checked_at")
    private Instant checkedAt;

    @Column(name = "checked_by")
    private String checkedBy;
}

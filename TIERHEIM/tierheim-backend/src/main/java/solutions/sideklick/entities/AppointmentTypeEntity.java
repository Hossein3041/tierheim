package solutions.sideklick.entities;


import io.micronaut.data.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointment_types")
public class AppointmentTypeEntity {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "order_number")
    private Long orderNumber;
}

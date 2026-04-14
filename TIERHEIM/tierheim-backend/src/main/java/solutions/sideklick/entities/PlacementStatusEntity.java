package solutions.sideklick.entities;

import io.micronaut.configuration.hibernate.jpa.proxy.GenerateProxy;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "placement_status")
@GenerateProxy
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacementStatusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true, length=64)
    private String name;

    @Column(name="display_name", length=128)
    private String displayName;

    @Column(name="order_name", nullable=false)
    private Short orderNumber = 0;

    @Column(nullable=false)
    private Boolean active = true;
}

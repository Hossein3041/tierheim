package solutions.sideklick.entities;

import io.micronaut.core.annotation.Introspected;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Serdeable
@Introspected
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MessageEntity {
  public MessageEntity(final String message) {
    this.message = message;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String message;
}

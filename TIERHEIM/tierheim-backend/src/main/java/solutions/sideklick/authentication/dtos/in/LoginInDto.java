package solutions.sideklick.authentication.dtos.in;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Serdeable
public class LoginInDto {

  @NotBlank
  private String username;

  @NotBlank
  private String password;
}

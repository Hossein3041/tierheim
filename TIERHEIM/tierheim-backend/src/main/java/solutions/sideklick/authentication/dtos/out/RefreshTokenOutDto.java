package solutions.sideklick.authentication.dtos.out;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Serdeable
public class RefreshTokenOutDto {

  @NotBlank
  private String idToken;

  @NotBlank
  private String accessToken;
}

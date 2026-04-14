package solutions.sideklick.authentication.dtos.read;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;
import solutions.sideklick.authentication.types.user.RoleType;

@Data
@Builder
@Serdeable
public class UserReadDto {

  private String id;

  private String username;

  private String name;

  private RoleType role;
}

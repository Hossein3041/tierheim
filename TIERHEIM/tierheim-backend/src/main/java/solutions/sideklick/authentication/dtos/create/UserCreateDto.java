package solutions.sideklick.authentication.dtos.create;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;
import solutions.sideklick.authentication.types.user.RoleType;

@Data
@Builder
@Serdeable
public class UserCreateDto {

  private String id;

  private String username;

  private RoleType role;
}

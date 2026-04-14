package solutions.sideklick.authentication.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;
import solutions.sideklick.authentication.types.user.RoleType;

@Data
@Builder
@Serdeable
public class UserDto {

  private String id;

  private RoleType role;
}

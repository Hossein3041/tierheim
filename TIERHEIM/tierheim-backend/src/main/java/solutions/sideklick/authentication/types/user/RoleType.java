package solutions.sideklick.authentication.types.user;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public enum RoleType {
  ADMIN,
  USER
}

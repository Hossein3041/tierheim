package solutions.sideklick.authentication.services.interfaces;

import java.util.Optional;

import solutions.sideklick.authentication.dtos.read.UserReadDto;

public interface UserServiceInterface {

  default Optional<UserReadDto> getByAccessToken(final String accessToken) {
    throw new UnsupportedOperationException(
        "Role-Management isn't implemented by the UserService!");
  }
}

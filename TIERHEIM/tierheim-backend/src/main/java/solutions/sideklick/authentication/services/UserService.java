package solutions.sideklick.authentication.services;

import io.micronaut.context.annotation.Value;
import jakarta.inject.Singleton;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import java.util.Optional;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;
import solutions.sideklick.authentication.clients.CognitoClient;
import solutions.sideklick.authentication.dtos.in.ConfirmInDto;
import solutions.sideklick.authentication.dtos.in.LoginInDto;
import solutions.sideklick.authentication.dtos.out.LoginOutDto;
import solutions.sideklick.authentication.dtos.out.RefreshTokenOutDto;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.authentication.exeptions.TemporaryPasswordException;
import solutions.sideklick.authentication.exeptions.UserChallengeException;
import solutions.sideklick.authentication.services.interfaces.UserServiceInterface;
import solutions.sideklick.authentication.types.user.RoleType;

@Singleton
public class UserService implements UserServiceInterface {

  private final String clientId;

  private final CognitoIdentityProviderClient cognitoIdentityProviderClient;

  public UserService(@Value("${authentication.cognito.client-id}") final String clientId) {
    this.clientId = clientId;
    this.cognitoIdentityProviderClient = new CognitoClient().get();
  }

  @Override
  public Optional<UserReadDto> getByAccessToken(final String accessToken) {
    GetUserRequest getUserRequest = GetUserRequest.builder().accessToken(accessToken).build();
    GetUserResponse getUserResponse = cognitoIdentityProviderClient.getUser(getUserRequest);
    String username = getUserResponse.username();
    String id = "";
    RoleType role = null;
    String name = "";
    label: for (AttributeType attributeType : getUserResponse.userAttributes()) {
      switch (attributeType.name()) {
        case "sub" -> {
          id = attributeType.value();
          if (role != null) {
            break label;
          }
        }
        case "custom:role" -> {
          role = RoleType.valueOf(attributeType.value());
          if (!id.isBlank()) {
            break label;
          }
        }
        case "name" -> name = attributeType.value();
      }
    }
    // ----
    // custom-attributes sind nicht mit getUser
    // abgreifbar.............................
    // Deswegen:
    // @FixMe
    role = RoleType.USER;
    // ----
    if (id.isBlank() || role == null) {
      return Optional.empty();
    }
    return Optional.of(
        UserReadDto.builder().username(username).id(id).role(role).name(name).build());
  }

  public LoginOutDto confirm(@Valid final ConfirmInDto confirmInDto) {
    InitiateAuthRequest initiateAuthRequest = InitiateAuthRequest.builder()
        .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
        .authParameters(
            Map.of(
                "USERNAME",
                confirmInDto.getUsername(),
                "PASSWORD",
                confirmInDto.getOldPassword()))
        .clientId(clientId)
        .build();
    InitiateAuthResponse initiateAuthResponse = cognitoIdentityProviderClient.initiateAuth(initiateAuthRequest);
    if (initiateAuthResponse.challengeName() != null) {
      if (initiateAuthResponse.challengeName().equals(ChallengeNameType.NEW_PASSWORD_REQUIRED)) {
        RespondToAuthChallengeRequest respondToAuthChallengeRequest = RespondToAuthChallengeRequest.builder()
            .challengeName(ChallengeNameType.NEW_PASSWORD_REQUIRED)
            .challengeResponses(
                Map.of(
                    "USERNAME",
                    confirmInDto.getUsername(),
                    "NEW_PASSWORD",
                    confirmInDto.getNewPassword()))
            .session(initiateAuthResponse.session())
            .clientId(clientId)
            .build();
        cognitoIdentityProviderClient.respondToAuthChallenge(respondToAuthChallengeRequest);
      } else {
        throw new UserChallengeException();
      }
    } else {
      throw new UserChallengeException();
    }
    // Wenn man zu schnell versucht sich einzuloggen, sind die Änderungen noch nicht
    // in Cognito
    // persistiert....... Deswegen warten wir hier :/
    try {
      Thread.sleep(1000);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    initiateAuthRequest = InitiateAuthRequest.builder()
        .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
        .authParameters(
            Map.of(
                "USERNAME",
                confirmInDto.getUsername(),
                "PASSWORD",
                confirmInDto.getNewPassword()))
        .clientId(clientId)
        .build();
    initiateAuthResponse = cognitoIdentityProviderClient.initiateAuth(initiateAuthRequest);
    if (initiateAuthResponse.challengeName() != null) {
      throw new UserChallengeException();
    }
    return LoginOutDto.builder()
        .idToken(initiateAuthResponse.authenticationResult().idToken())
        .accessToken(initiateAuthResponse.authenticationResult().accessToken())
        .refreshToken(initiateAuthResponse.authenticationResult().refreshToken())
        .build();
  }

  public LoginOutDto login(@Valid final LoginInDto loginInDto) {
    InitiateAuthRequest initiateAuthRequest = InitiateAuthRequest.builder()
        .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
        .authParameters(
            Map.of("USERNAME", loginInDto.getUsername(), "PASSWORD", loginInDto.getPassword()))
        .clientId(clientId)
        .build();
    InitiateAuthResponse initiateAuthResponse = cognitoIdentityProviderClient.initiateAuth(initiateAuthRequest);
    if (initiateAuthResponse.challengeName() != null) {
      if (initiateAuthResponse.challengeName().equals(ChallengeNameType.NEW_PASSWORD_REQUIRED)) {
        throw new TemporaryPasswordException("Password is temporary password!");
      }
      throw new UserChallengeException();
    }
    return LoginOutDto.builder()
        .idToken(initiateAuthResponse.authenticationResult().idToken())
        .accessToken(initiateAuthResponse.authenticationResult().accessToken())
        .refreshToken(initiateAuthResponse.authenticationResult().refreshToken())
        .build();
  }

  public void logout(@NotBlank final String token) {
    RevokeTokenRequest revokeTokenRequest = RevokeTokenRequest.builder().clientId(clientId).token(token).build();
    RevokeTokenResponse revokeTokenResponse = cognitoIdentityProviderClient.revokeToken(revokeTokenRequest);
  }

  public RefreshTokenOutDto refreshToken(@NotBlank final String token) {
    InitiateAuthRequest initiateAuthRequest = InitiateAuthRequest.builder()
        .authFlow(AuthFlowType.REFRESH_TOKEN_AUTH)
        .authParameters(Map.of("REFRESH_TOKEN", token))
        .clientId(clientId)
        .build();
    InitiateAuthResponse initiateAuthResponse = cognitoIdentityProviderClient.initiateAuth(initiateAuthRequest);
    if (initiateAuthResponse.challengeName() != null) {
      throw new UserChallengeException();
    }
    return RefreshTokenOutDto.builder()
        .idToken(initiateAuthResponse.authenticationResult().idToken())
        .accessToken(initiateAuthResponse.authenticationResult().accessToken())
        .build();
  }
}

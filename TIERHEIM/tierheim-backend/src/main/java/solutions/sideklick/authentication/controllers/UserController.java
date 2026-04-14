package solutions.sideklick.authentication.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import software.amazon.awssdk.services.cognitoidentityprovider.model.InvalidPasswordException;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UserNotConfirmedException;
import software.amazon.awssdk.services.cognitoidentityprovider.model.UserNotFoundException;
import solutions.sideklick.authentication.dtos.in.ConfirmInDto;
import solutions.sideklick.authentication.dtos.in.LoginInDto;
import solutions.sideklick.authentication.dtos.out.LoginOutDto;
import solutions.sideklick.authentication.dtos.out.RefreshTokenOutDto;
import solutions.sideklick.authentication.exeptions.TemporaryPasswordException;
import solutions.sideklick.authentication.exeptions.UserChallengeException;
import solutions.sideklick.authentication.services.UserService;

@Controller
public class UserController {

  private final UserService userService;

  public UserController(final UserService userService) {
    this.userService = userService;
  }

  @Post("${micronaut.base.path}/public/login")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<LoginOutDto> login(@Body @Valid final LoginInDto loginInDto) {
    try {
      return HttpResponse.ok(userService.login(loginInDto));
    } catch (UserChallengeException e) {
      return HttpResponse.status(403, "User challenge exception.");
    } catch (InvalidPasswordException | UserNotFoundException e) {
      return HttpResponse.unauthorized();
    } catch (UserNotConfirmedException e) {
      return HttpResponse.status(403, "User is not confirmed.");
    } catch (TemporaryPasswordException e) {
      return HttpResponse.status(412, "Please reset password.");
    }
  }

  @Post("${micronaut.base.path}/public/confirm")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<LoginOutDto> confirm(@Body @Valid final ConfirmInDto confirmInDto) {
    return HttpResponse.ok(userService.confirm(confirmInDto));
  }

  @Get("${micronaut.base.path}/public/logout")
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<Void> logout(@QueryValue("token") @NotBlank final String token) {
    userService.logout(token);
    return HttpResponse.ok();
  }

  @Get("${micronaut.base.path}/public/refresh_token")
  @Produces(MediaType.APPLICATION_JSON)
  public HttpResponse<RefreshTokenOutDto> refreshToken(
      @QueryValue("token") @NotBlank final String token) {
    return HttpResponse.ok(userService.refreshToken(token));
  }
}

package solutions.sideklick.authentication.aop.binders;

import io.micronaut.context.annotation.Value;
import io.micronaut.core.convert.ArgumentConversionContext;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.bind.binders.AnnotatedRequestArgumentBinder;
import jakarta.inject.Singleton;
import solutions.sideklick.authentication.aop.annotations.User;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.authentication.services.UserService;
import solutions.sideklick.authentication.types.user.RoleType;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Binds a {@link User} annotation on a method parameter to a
 * {@link UserReadDto} instance based on
 * the current HTTP request. This class implements the
 * {@link AnnotatedRequestArgumentBinder}
 * interface to facilitate custom binding logic for parameters annotated with
 * {@code @User}.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Singleton
public class UserBinder implements AnnotatedRequestArgumentBinder<User, UserReadDto> {

  /**
   * Logger for this class.
   *
   * @since 0.1.0
   */
  private final Logger logger = LoggerFactory.getLogger(UserBinder.class);

  /**
   * Service to access user data.
   *
   * @since 0.1.0
   */
  private final UserService userService;

  /**
   * The name of the HTTP header from which to extract the authentication token.
   *
   * @since 0.1.0
   */
  private final String authenticationHeaderName;

  /**
   * Flag to indicate if authentication should be bypassed (useful for debugging).
   *
   * @since 0.1.0
   */
  private final boolean isAuthenticationDisabled;

  /**
   * User ID to use when authentication is disabled.
   *
   * @since 0.1.0
   */
  private final String testUserId;

  /**
   * Constructs a new {@code UserBinder} with necessary dependencies and
   * configuration.
   *
   * @param userService              the user service to fetch user details
   * @param authenticationHeaderName the name of the header where the
   *                                 authentication token is
   *                                 located
   * @param isAuthenticationDisabled flag to disable authentication for debugging
   * @param testUserId               the user ID to use when authentication is
   *                                 disabled
   * @since 0.1.0
   */
  public UserBinder(
      final UserService userService,
      @Value("${authentication.header.name}") final String authenticationHeaderName,
      @Value("${authentication.disabled}") final boolean isAuthenticationDisabled,
      @Value("${authentication.test_user_id}") final String testUserId) {
    this.userService = userService;
    this.authenticationHeaderName = authenticationHeaderName;
    this.isAuthenticationDisabled = isAuthenticationDisabled;
    this.testUserId = testUserId;
  }

  /**
   * Binds the {@link User} annotation on a method parameter to a
   * {@link UserReadDto} instance. This
   * method retrieves the user details based on the authorization token provided
   * in the HTTP request
   * header.
   *
   * @param context the conversion context for the argument
   * @param source  the HTTP request containing the authorization header
   * @return a {@link BindingResult} representing the bound user
   * @throws RuntimeException if no authorization header is provided or the user
   *                          cannot be found
   * @since 0.1.0
   */
  @Override
  public BindingResult<UserReadDto> bind(
      final ArgumentConversionContext<UserReadDto> context, final HttpRequest<?> source) {
    String accessToken = source.getHeaders().get(authenticationHeaderName);
    if (accessToken == null) {
      if (isAuthenticationDisabled) {
        logger.info("Authentication is in DEBUG-MODE!");
        return () -> Optional.of(
            UserReadDto.builder()
                .id(testUserId)
                .username("admin")
                .role(RoleType.ADMIN)
                .build());
      }
      throw new RuntimeException("No Authorization header provided.");
    }
    Optional<UserReadDto> userReadDto = userService.getByAccessToken(accessToken);
    if (userReadDto.isEmpty()) {
      throw new RuntimeException("User not found.");
    }
    return () -> userReadDto;
  }

  /**
   * Returns the {@link User} class type as the annotation this binder handles.
   *
   * @return the {@link User} class type
   * @since 0.1.0
   */
  @Override
  public Class<User> getAnnotationType() {
    return User.class;
  }
}

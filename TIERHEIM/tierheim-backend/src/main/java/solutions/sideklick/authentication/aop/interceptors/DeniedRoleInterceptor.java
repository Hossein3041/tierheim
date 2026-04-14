package solutions.sideklick.authentication.aop.interceptors;

import io.micronaut.aop.MethodInterceptor;
import io.micronaut.aop.MethodInvocationContext;
import io.micronaut.core.type.MutableArgumentValue;
import jakarta.inject.Singleton;
import solutions.sideklick.authentication.aop.annotations.DeniedRole;
import solutions.sideklick.authentication.aop.annotations.User;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.authentication.exeptions.UnauthorizedException;
import solutions.sideklick.authentication.types.user.RoleType;

/**
 * Interceptor that checks if the current user's role is among the roles
 * explicitly denied from
 * accessing the method. This interceptor expects that a {@link UserReadDto}
 * parameter annotated
 * with {@link User} is present in the method arguments. If the user's role is
 * listed among the
 * denied roles, an {@link UnauthorizedException} is thrown.
 *
 * <p>
 * Usage: Annotate methods with {@link DeniedRole} where access needs to be
 * restricted based on
 * user roles. Ensure that a {@link UserReadDto} parameter annotated with
 * {@link User} is available
 * to facilitate role checking.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Singleton
public class DeniedRoleInterceptor implements MethodInterceptor<Object, Object> {

  /**
   * Intercepts a method invocation to enforce role-based access denial.
   *
   * @param context the method invocation context
   * @return the result of the method invocation if the access denial check passes
   * @since 0.1.0
   */
  @Override
  public Object intercept(MethodInvocationContext<Object, Object> context) {
    RoleType[] deniedRoles = context.enumValues(
        "solutions.sideklick.generic.aop.annotations.DeniedRole", RoleType.class);
    for (Object object : context.getParameters().keySet()) {
      MutableArgumentValue<?> parameter = context.getParameters().get(object);
      if (parameter.getType().equals(UserReadDto.class)) {
        if (parameter.isAnnotationPresent(User.class)) {
          UserReadDto userReadDto = (UserReadDto) parameter.getValue();
          RoleType userRole = userReadDto.getRole();
          if (userRole == null) {
            throw new UnauthorizedException("User: " + userReadDto.getId() + " has no Role!");
          }
          for (RoleType deniedRole : deniedRoles) {
            if (deniedRole.equals(userRole)) {
              throw new UnauthorizedException(
                  "User: " + userReadDto.getId() + " is not allowed to request Ressource!");
            }
          }
          return context.proceed();
        }
      }
    }
    throw new RuntimeException(
        "Please provide a UserDto annotated with @User for DeniedRole to work.");
  }
}

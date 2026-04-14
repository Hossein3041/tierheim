package solutions.sideklick.authentication.aop.interceptors;

import io.micronaut.aop.MethodInterceptor;
import io.micronaut.aop.MethodInvocationContext;
import io.micronaut.core.type.MutableArgumentValue;
import jakarta.inject.Singleton;
import solutions.sideklick.authentication.aop.annotations.AllowedRole;
import solutions.sideklick.authentication.aop.annotations.User;
import solutions.sideklick.authentication.dtos.read.UserReadDto;
import solutions.sideklick.authentication.exeptions.UnauthorizedException;
import solutions.sideklick.authentication.types.user.RoleType;

/**
 * Interceptor that checks if the current user has one of the allowed roles
 * before proceeding with
 * the method invocation. This interceptor assumes that a {@link UserReadDto} is
 * among the method
 * parameters and it's annotated with {@link User}. If the user role is not
 * among the allowed roles,
 * an {@link UnauthorizedException} is thrown.
 *
 * <p>
 * Usage: Annotate methods with {@link AllowedRole} where access control based
 * on user roles is
 * needed. Ensure a {@link UserReadDto} parameter annotated with {@link User} is
 * available for role
 * checking.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Singleton
public class AllowedRoleInterceptor implements MethodInterceptor<Object, Object> {

  /*
   * Intercepts a method invocation to perform role-based access control.
   *
   * @param context the method invocation context
   * 
   * @return the result of the method invocation if the access check passes
   * 
   * @throws UnauthorizedException if the user role is not allowed or the user has
   * no role defined.
   * 
   * @throws RuntimeException if no {@link UserDto} parameter annotated with
   * {@link User} is found.
   * 
   * @since 0.1.0
   */
  @Override
  public Object intercept(MethodInvocationContext<Object, Object> context) {
    RoleType[] allowedRoles = context.enumValues(
        "solutions.sideklick.generic.aop.annotations.AllowedRole", RoleType.class);
    for (Object object : context.getParameters().keySet()) {
      MutableArgumentValue<?> parameter = context.getParameters().get(object);
      if (parameter.getType().equals(UserReadDto.class)) {
        if (parameter.isAnnotationPresent(User.class)) {
          UserReadDto userReadDto = (UserReadDto) parameter.getValue();
          RoleType userRole = userReadDto.getRole();
          if (userRole == null) {
            throw new UnauthorizedException("User: " + userReadDto.getId() + " has no Role!");
          }
          for (RoleType allowedRole : allowedRoles) {
            if (allowedRole.equals(userRole)) {
              return context.proceed();
            }
          }
          throw new UnauthorizedException(
              "User: " + userReadDto.getId() + " is not allowed to request Ressource!");
        }
      }
    }
    throw new RuntimeException(
        "Please provide a UserDto annotated with @User for DeniedRole to work.");
  }
}

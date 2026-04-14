package solutions.sideklick.authentication.aop.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.micronaut.aop.Around;
import io.micronaut.context.annotation.Type;
import solutions.sideklick.authentication.aop.interceptors.DeniedRoleInterceptor;
import solutions.sideklick.authentication.types.user.RoleType;

/**
 * Specifies the roles denied from executing a method, enforced at runtime.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD })
@Around
@Type(DeniedRoleInterceptor.class)
public @interface DeniedRole {
  RoleType[] value();
}

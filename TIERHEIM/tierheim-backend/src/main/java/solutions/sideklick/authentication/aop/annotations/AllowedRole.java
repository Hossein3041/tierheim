package solutions.sideklick.authentication.aop.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.micronaut.aop.Around;
import io.micronaut.context.annotation.Type;
import solutions.sideklick.authentication.aop.interceptors.AllowedRoleInterceptor;
import solutions.sideklick.authentication.types.user.RoleType;

/**
 * The {@code AllowedRole} annotation is used to define the allowed roles for
 * accessing specific
 * methods. It is used in conjunction with an interceptor that checks if the
 * executing user's role
 * matches any of the roles specified in the annotation before allowing access
 * to the annotated
 * method.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD })
@Around
@Type(AllowedRoleInterceptor.class)
public @interface AllowedRole {
  RoleType[] value();
}

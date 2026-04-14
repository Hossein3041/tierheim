package solutions.sideklick.authentication.aop.annotations;

import io.micronaut.core.bind.annotation.Bindable;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks a parameter to be resolved as the user object, typically bound from the
 * security context.
 * Use with methods where user details are needed directly from the method's
 * parameters.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
@Bindable
public @interface User {
}

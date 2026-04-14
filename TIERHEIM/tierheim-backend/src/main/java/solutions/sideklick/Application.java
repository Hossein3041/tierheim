package solutions.sideklick;

import org.hibernate.dialect.PostgreSQLDialect;

import io.micronaut.core.annotation.TypeHint;
import io.micronaut.runtime.Micronaut;

/**
 * The main entry point for local testing and development of the Lambda
 * application. While this
 * class is not used in the AWS Lambda deployment, it is crucial for simulating
 * the application's
 * behavior locally.
 *
 * <p>
 * By running this class, the Micronaut framework is bootstrapped, allowing the
 * application to
 * run as a standalone service, similar to its behavior when deployed as a
 * Lambda function.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@TypeHint({
    PostgreSQLDialect.class,
    org.postgresql.Driver.class
})
public class Application {

  /**
   * The main method that bootstraps the Micronaut framework. This method is the
   * starting point for
   * running the application locally.
   *
   * @param args Command line arguments passed to the application.
   * @since 0.1.0
   */
  public static void main(String[] args) {
    Micronaut.run(Application.class, args);
  }
}

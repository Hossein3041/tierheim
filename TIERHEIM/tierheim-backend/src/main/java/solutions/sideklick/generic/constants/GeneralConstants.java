package solutions.sideklick.generic.constants;

/**
 * The {@code GeneralConstants} class holds a set of constant values that are used throughout the
 * application.
 *
 * @author Ole Nordhusen
 * @version 0.1.0 since 0.1.0
 */
public class GeneralConstants {

  /** The AWS profile name to be used for accessing AWS resources. */
  public static final String AWS_PROFILE = "sideklick";

  /**
   * The environment variable that specifies the root directory of the Lambda task in the operating
   * environment.
   */
  public static final String OPERATING_ENVIRONMENT_VARIABLE = "LAMBDA_TASK_ROOT";
}

package solutions.sideklick.authentication.exeptions;

/**
 * Custom exception for signaling unauthorized access attempts in the
 * application. This exception is
 * typically thrown when a user does not have the required permissions to
 * execute an action, or
 * their role explicitly prevents them from accessing a particular resource.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
public class TemporaryPasswordException extends RuntimeException {

  /**
   * Constructs a new empty UnauthorizedException.
   *
   * @since 0.1.0
   */
  public TemporaryPasswordException() {
    super();
  }

  /**
   * Constructs a new UnauthorizedException with a detailed message.
   *
   * @param message the detail message about the unauthorized access attempt
   * @since 0.1.0
   */
  public TemporaryPasswordException(String message) {
    super(message);
  }

  /**
   * Constructs a new UnauthorizedException with a detailed message and a cause.
   *
   * @param message the detail message about the unauthorized access attempt
   * @param cause   the cause of this exception (typically another exception that
   *                led to this one)
   * @since 0.1.0
   */
  public TemporaryPasswordException(String message, Throwable cause) {
    super(message, cause);
  }

  /**
   * Constructs a new UnauthorizedException with a cause.
   *
   * @param cause the cause of this exception (typically another exception that
   *              led to this one)
   * @since 0.1.0
   */
  public TemporaryPasswordException(Throwable cause) {
    super(cause);
  }

  /**
   * Constructs a new UnauthorizedException with a detailed message, a cause, and
   * options for
   * suppression and writable stack trace.
   *
   * @param message            the detail message about the unauthorized access
   *                           attempt
   * @param cause              the cause of this exception
   * @param enableSuppression  whether or not suppression is enabled
   * @param writableStackTrace whether or not the stack trace should be writable
   * @since 0.1.0
   */
  protected TemporaryPasswordException(
      String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }
}

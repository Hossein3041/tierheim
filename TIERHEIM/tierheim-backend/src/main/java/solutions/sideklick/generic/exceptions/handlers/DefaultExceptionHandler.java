package solutions.sideklick.generic.exceptions.handlers;

import io.micronaut.context.annotation.Value;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Default exception handler class that processes all uncaught exceptions within
 * the application.
 * This handler logs the error message and returns a generic server error
 * response to the client.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Singleton
public class DefaultExceptionHandler implements ExceptionHandler<Exception, HttpResponse> {

  /**
   * Logger for this class to log error details.
   *
   * @since 0.1.0
   */
  private final Logger logger = LoggerFactory.getLogger(DefaultExceptionHandler.class);

  private final boolean showErrorMessageInResponse;

  public DefaultExceptionHandler(
      @Value("${show.errors.in.response}") final boolean showErrorMessageInResponse) {
    this.showErrorMessageInResponse = showErrorMessageInResponse;
  }

  /**
   * Handles an exception that occurs during HTTP request processing by logging
   * the error and
   * returning a server error response.
   *
   * @param request   the HTTP request during which the exception occurred
   * @param exception the exception that was thrown
   * @return an {@link HttpResponse} object representing a server error response
   * @since 0.1.0
   */
  @Override
  public HttpResponse<String> handle(final HttpRequest request, final Exception exception) {
    logger.error("Default Exception: ", exception);
    if (showErrorMessageInResponse) {
      return HttpResponse.serverError(exception.getMessage());
    }
    return HttpResponse.serverError();
  }
}

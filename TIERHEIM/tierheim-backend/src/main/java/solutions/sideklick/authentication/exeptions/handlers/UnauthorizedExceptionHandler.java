package solutions.sideklick.authentication.exeptions.handlers;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import jakarta.inject.Singleton;
import solutions.sideklick.authentication.exeptions.UnauthorizedException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Handles exceptions of type {@link UnauthorizedException} that occur during
 * HTTP request
 * processing. This handler logs the exception details and returns an
 * unauthorized response to the
 * client, indicating that the request could not be processed due to a lack of
 * necessary
 * permissions.
 *
 * @author Ole Nordhusen
 * @version 0.1.0
 * @since 0.1.0
 */
@Singleton
public class UnauthorizedExceptionHandler
    implements ExceptionHandler<UnauthorizedException, HttpResponse> {

  /**
   * Logger for this class to log error details.
   *
   * @since 0.1.0
   */
  private final Logger logger = LoggerFactory.getLogger(UnauthorizedExceptionHandler.class);

  /**
   * Handles an {@link UnauthorizedException} by logging the error and returning
   * an unauthorized
   * response to the client.
   *
   * @param request   the HTTP request during which the exception occurred
   * @param exception the unauthorized exception that was thrown
   * @return an {@link HttpResponse} object representing an unauthorized response
   * @since 0.1.0
   */
  @Override
  public HttpResponse handle(HttpRequest request, UnauthorizedException exception) {
    logger.error(exception.getMessage());
    return HttpResponse.unauthorized();
  }
}

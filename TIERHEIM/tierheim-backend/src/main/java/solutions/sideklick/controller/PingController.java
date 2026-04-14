package solutions.sideklick.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;

@Controller
public class PingController {
  @Get("${micronaut.base.path}/public/ping")
  public HttpResponse<String> ping() {
    return HttpResponse.ok("Pong!");
  }
}

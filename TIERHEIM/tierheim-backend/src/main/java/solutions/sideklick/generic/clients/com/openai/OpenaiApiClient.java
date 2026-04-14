package solutions.sideklick.generic.clients.com.openai;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.http.client.annotation.Client;
import solutions.sideklick.generic.clients.com.openai.completions.dtos.in.OpenApiRequest;
import solutions.sideklick.generic.clients.com.openai.completions.dtos.out.OpenaiApiCompletionsOutDto;


@Client("${openai.api.url}")
public interface OpenaiApiClient {

    @Post("${openai.api.chat.url}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Header(name = "Authorization", value = "${openai.api.key}")
    HttpResponse<OpenaiApiCompletionsOutDto> completions(@Body final OpenApiRequest requestBody);

    @Post("${openai.api.chat.url}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Header(name = "Authorization", value = "${openai.api.key}")
    HttpResponse<OpenaiApiCompletionsOutDto> completions(@Body final String requestBody);
}

package solutions.sideklick.generic.clients.com.openai.completions.dtos.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import solutions.sideklick.generic.types.chat.MessageType;
import solutions.sideklick.generic.types.chat.ResponseFormat;

@Data
@Builder
@Serdeable
public class OpenApiRequest {
    private String model;
    private double temperature;
    private List<MessageType> messages;

    @JsonProperty("response_format")
    private ResponseFormat responseFormat;
}

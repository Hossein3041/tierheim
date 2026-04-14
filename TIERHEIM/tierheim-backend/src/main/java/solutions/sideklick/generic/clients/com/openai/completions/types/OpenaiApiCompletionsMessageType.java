package solutions.sideklick.generic.clients.com.openai.completions.types;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Data
@Serdeable
public class OpenaiApiCompletionsMessageType {

    private String role;

    private String content;

    private String refusal;
}

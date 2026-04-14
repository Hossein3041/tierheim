package solutions.sideklick.generic.clients.com.openai.completions.types;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Data;

@Data
@Serdeable
public class OpenaiApiCompletionsChoiceType {

    private long index;

    private OpenaiApiCompletionsMessageType message;

    @JsonProperty("logprobs")
    private String logProbs;

    @JsonProperty("finish_reason")
    private String finishReason;
}

package solutions.sideklick.generic.clients.com.openai.completions.dtos.out;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;
import java.util.List;
import lombok.Data;
import solutions.sideklick.generic.clients.com.openai.completions.types.OpenaiApiCompletionsChoiceType;
import solutions.sideklick.generic.clients.com.openai.completions.types.OpenaiApiCompletionsUsageType;

@Data
@Serdeable
public class OpenaiApiCompletionsOutDto {

    private String id;

    private String object;

    private Long created;

    private String model;

    private List<OpenaiApiCompletionsChoiceType> choices;

    private OpenaiApiCompletionsUsageType usage;

    @JsonProperty("system_fingerprint")
    private String systemFingerprint;
}

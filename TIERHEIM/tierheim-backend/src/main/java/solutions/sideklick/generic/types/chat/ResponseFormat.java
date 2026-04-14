package solutions.sideklick.generic.types.chat;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Serdeable
public class ResponseFormat {
    private final String type;

    @JsonProperty("json_schema")
    private final MarkdownExtractionSchema jsonSchema;
}

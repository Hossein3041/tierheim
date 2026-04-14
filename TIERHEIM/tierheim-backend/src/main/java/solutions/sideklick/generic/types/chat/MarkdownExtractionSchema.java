package solutions.sideklick.generic.types.chat;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Serdeable
public class MarkdownExtractionSchema {
    private String name;
    private MarkdownExtractionSchema.Schema schema;

    @Data
    @Builder
    @Serdeable
    public static class Schema {
        private String type;
        private MarkdownExtractionSchema.SchemaProperties properties;
        private String[] required;
        private boolean additionalProperties;
    }

    @Data
    @Builder
    @Serdeable
    public static class SchemaProperties {
        private Property id;
        private Property name;
    }

    @Data
    @Builder
    @Serdeable
    public static class Property {
        private String[] type;
        private String description;
    }
}
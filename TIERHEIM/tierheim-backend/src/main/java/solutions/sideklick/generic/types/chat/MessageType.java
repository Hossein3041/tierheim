package solutions.sideklick.generic.types.chat;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Data;

@Data
@Serdeable
public class MessageType {

    private String role;
    private Object content;
}
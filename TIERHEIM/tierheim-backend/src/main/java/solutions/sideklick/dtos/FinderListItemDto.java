package solutions.sideklick.dtos;

import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Serdeable
@AllArgsConstructor
@NoArgsConstructor
public class FinderListItemDto {

    private Long id;
    private String name;
    private String phone;
    private String address;
}

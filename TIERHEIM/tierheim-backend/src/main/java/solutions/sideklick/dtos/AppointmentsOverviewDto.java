package solutions.sideklick.dtos;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonValue;
import io.micronaut.serde.annotation.Serdeable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Serdeable
@AllArgsConstructor
@Getter
@Setter
public class AppointmentsOverviewDto {
    private final Map<String, Map<String, List<AppointmentItemDto>>> appointmentsBySpeciesAndCategory;

    @JsonValue
    public Map<String, Map<String, List<AppointmentItemDto>>> asJson() {
        return appointmentsBySpeciesAndCategory;
    }
}

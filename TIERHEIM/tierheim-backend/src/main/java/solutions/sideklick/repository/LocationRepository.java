package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.dtos.LocationSectionPet;
import solutions.sideklick.entities.LocationEntity;
import java.util.List;

@Repository
public interface LocationRepository extends CrudRepository<LocationEntity, Long> {

}

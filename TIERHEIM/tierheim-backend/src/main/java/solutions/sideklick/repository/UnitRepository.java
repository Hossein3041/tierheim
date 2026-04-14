package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.UnitEntity;

import java.util.List;

@Repository
public interface UnitRepository extends CrudRepository<UnitEntity, Long> {

    @Query("SELECT u FROM UnitEntity u JOIN FETCH u.section s JOIN FETCH s.location l")
    List<UnitEntity> findAllWithJoins();

    UnitEntity findByName(String waitingRoom);

    List<UnitEntity> findBySectionIdOrderByIdAsc(Long sectionId);
}

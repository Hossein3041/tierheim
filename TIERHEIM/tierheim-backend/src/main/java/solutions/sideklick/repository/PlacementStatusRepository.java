package solutions.sideklick.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.PlacementStatusEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlacementStatusRepository extends JpaRepository<PlacementStatusEntity, Long> {
    Optional<PlacementStatusEntity> findByNameIgnoreCase(String name);
    List<PlacementStatusEntity> findAllByActiveTrueOrderByOrderNumberAsc();
}

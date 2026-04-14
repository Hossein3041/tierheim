package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.PetColorEntity;

import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<PetColorEntity, Long> {

    Optional<PetColorEntity> findByNameIlike(String name);

    @Query("SELECT pc FROM PetColorEntity pc WHERE LOWER(pc.name) = LOWER(:name)")
    Optional<PetColorEntity> findByNameCaseInsensitive(String name);
}

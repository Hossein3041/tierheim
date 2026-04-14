package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.PetBreedEntity;

import java.util.Optional;

@Repository
public interface BreedRepository extends JpaRepository<PetBreedEntity, Long> {

    Optional<PetBreedEntity> findByNameIlike(String name);

    @Query("SELECT pb FROM PetBreedEntity pb WHERE LOWER(pb.name) = LOWER(:name)")
    Optional<PetBreedEntity> findByNameCaseInsensitive(String name);
}

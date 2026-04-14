package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.PetFoodEntity;

import java.util.Optional;

@Repository
public interface PetFoodRepository extends CrudRepository<PetFoodEntity, Long> {

    @Query("SELECT food FROM PetFoodEntity food WHERE LOWER(food.name) = LOWER(:name)")
    Optional<PetFoodEntity> findByNameCaseInsensitive(String name);
}

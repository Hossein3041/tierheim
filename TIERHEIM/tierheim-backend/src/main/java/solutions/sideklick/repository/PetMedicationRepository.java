package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.PetMedicationEntity;

import java.util.Optional;

@Repository
public interface PetMedicationRepository extends CrudRepository<PetMedicationEntity, Long> {

    @Query("SELECT medication FROM PetMedicationEntity medication WHERE LOWER(medication.name) = LOWER(:name)")
    Optional<PetMedicationEntity> findByNameCaseInsensitive(String name);
}

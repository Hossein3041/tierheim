package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.PetSpeciesEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetSpeciesRepository extends JpaRepository<PetSpeciesEntity, Long> {


    @Query("SELECT ps FROM PetSpeciesEntity ps WHERE LOWER(ps.name) = LOWER(:name)")
    Optional<PetSpeciesEntity> findByNameCaseInsensitive(String name);

    @Query("SELECT ps FROM PetSpeciesEntity ps ORDER BY ps.orderNumber ASC")
    List<PetSpeciesEntity> findAllByOrderByOrderNumberAsc();

}

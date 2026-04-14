package solutions.sideklick.repository;

import io.micronaut.data.annotation.Join;
import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.dtos.LocationSectionPet;
import solutions.sideklick.entities.PetEntity;
import solutions.sideklick.entities.SectionEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends CrudRepository<PetEntity, Long> {

    List<PetEntity> findByIsActiveTrue();

    @Query("""
        SELECT p FROM PetEntity p
            LEFT JOIN FETCH p.species s
            LEFT JOIN FETCH p.breed b
            LEFT JOIN FETCH p.color c
            LEFT JOIN FETCH p.unit u
            LEFT JOIN FETCH p.placementStatus ps
            LEFT JOIN FETCH p.finder f
        WHERE p.isActive = :active
        ORDER BY p.dateFound DESC              
    """)
    List<PetEntity> findAllOverviewByActive(boolean active);

    Optional<PetEntity> findById(long id);

    @Join(value = "unit", type = Join.Type.FETCH)
    @Join(value = "unit.section", type = Join.Type.FETCH)
    List<PetEntity> findByUnitSectionOrderById(SectionEntity section);

    @Query("UPDATE PetEntity p SET p.unit.id = :unitId WHERE p.id = :petId")
    void updateUnit(long petId, long unitId);

}


package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.SectionEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionRepository extends CrudRepository<SectionEntity, Long> {
    @Query("""
        SELECT s
        FROM SectionEntity s
        LEFT JOIN FETCH s.units u
        WHERE s.id = :sectionId
        ORDER BY u.id ASC
    """)
    Optional<SectionEntity> findByIdWithUnits(Long sectionId);

    @Query("SELECT s FROM SectionEntity s LEFT JOIN FETCH s.location")
    List<SectionEntity> findAllWithLocation();

    Optional<SectionEntity> findById(Long sectionId);

    boolean existsById(long id);

}

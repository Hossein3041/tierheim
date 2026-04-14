package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.FinderEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface FinderRepository extends CrudRepository<FinderEntity, Long> {

    @Query("SELECT f FROM FinderEntity f WHERE LOWER(CONCAT(COALESCE(f.firstName,''),' ',COALESCE(f.lastName,'')))=LOWER(:full)")
    Optional<FinderEntity> findByFullName(String full);

    Optional<FinderEntity> findByFirstNameAndLastName(String firstName, String lastName);

    Optional<FinderEntity> findByFirstName(String namePart);

    @Query("""
           SELECT f
           FROM FinderEntity f
           ORDER BY f.lastName, f.firstName
           """)
    List<FinderEntity> findAllOrderByName();

    @Query("""
           SELECT f
           FROM FinderEntity f
           WHERE LOWER(CONCAT(COALESCE(f.firstName,''), ' ', COALESCE(f.lastName,'')))
                 LIKE LOWER(CONCAT('%', :q, '%'))
           ORDER BY f.lastName, f.firstName
           """)
    List<FinderEntity> searchByNameLike(String q);
}

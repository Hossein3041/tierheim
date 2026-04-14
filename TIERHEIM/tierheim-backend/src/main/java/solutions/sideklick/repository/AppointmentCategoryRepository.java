package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.AppointmentCategoryEntity;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentCategoryRepository extends JpaRepository<AppointmentCategoryEntity, Long>{
    @Query("SELECT a FROM AppointmentCategoryEntity a ORDER BY a.orderNumber ASC")
    List<AppointmentCategoryEntity> findAllOrderByOrderNumberAsc();

    Optional<AppointmentCategoryEntity> findFirstByNameIgnoreCase(String name);
    Optional<AppointmentCategoryEntity> findByNameIgnoreCase(String name);
}

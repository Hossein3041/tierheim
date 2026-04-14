package solutions.sideklick.repository;

import io.micronaut.data.annotation.Query;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import solutions.sideklick.entities.AppointmentTypeEntity;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentTypeRepository extends JpaRepository<AppointmentTypeEntity, Long>{
    @Query("SELECT a FROM AppointmentTypeEntity a ORDER BY a.orderNumber ASC")
    List<AppointmentTypeEntity> findAllOrderByOrderNumberAsc();

    Optional<AppointmentTypeEntity> findFirstByNameIgnoreCase(String name);
    Optional<AppointmentTypeEntity> findByNameIgnoreCase(String name);
}

package solutions.sideklick.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.jpa.repository.JpaRepository;
import io.micronaut.data.annotation.Query;
import solutions.sideklick.entities.AppointmentEntity;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long>{
        @Query("""
                SELECT a FROM AppointmentEntity a
                LEFT JOIN FETCH a.type t
                LEFT JOIN FETCH a.category c
                LEFT JOIN FETCH a.pet p
                LEFT JOIN FETCH p.species s
                LEFT JOIN FETCH p.breed b
                WHERE a.date IN (:dates)
        """)
        List<AppointmentEntity> findAllWithJoinsByDateIn(Collection<LocalDate> dates);

        @Query("""
                SELECT a FROM AppointmentEntity a
                LEFT JOIN FETCH a.type t
                LEFT JOIN FETCH a.category c
                LEFT JOIN FETCH a.pet p
                LEFT JOIN FETCH p.species s
                LEFT JOIN FETCH p.breed b
        """)
        List<AppointmentEntity> findAllWithJoins();

        @Query("UPDATE AppointmentEntity a SET a.checked = :checked WHERE a.id = :id")
        int setCheckedById(Long id, boolean checked);

        @Query(value = "UPDATE appointments SET checked = NOT checked WHERE id = :id", nativeQuery = true)
        int toggleCheckedById(Long id);
}

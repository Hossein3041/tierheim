package solutions.sideklick.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import solutions.sideklick.entities.MessageEntity;

@Repository
public interface MessageRepository extends CrudRepository<MessageEntity, Long> {
}

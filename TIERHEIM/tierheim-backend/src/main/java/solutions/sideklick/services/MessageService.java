package solutions.sideklick.services;

import java.util.List;

import jakarta.inject.Singleton;
import solutions.sideklick.entities.MessageEntity;
import solutions.sideklick.repository.MessageRepository;

@Singleton
public class MessageService {
  private final MessageRepository messageRepository;

  public MessageService(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  public MessageEntity addMessage(final MessageEntity message) {
    MessageEntity msg = messageRepository.save(message);
    return msg;
  }

  public List<MessageEntity> getAllMessages() {
    return messageRepository.findAll();
  }

  public void deleteAllMessages() {
    messageRepository.deleteAll();
  }
}

package solutions.sideklick.controller;

import java.util.List;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import solutions.sideklick.entities.MessageEntity;
import solutions.sideklick.services.MessageService;

@Controller
public class MessageController {

  private final MessageService messageService;

  public MessageController(MessageService messageService) {
    this.messageService = messageService;
  }

  @Post("${micronaut.base.path}/private/message")
  public HttpResponse<MessageEntity> addMessage(@Body final MessageEntity message) {
    return HttpResponse.ok(messageService.addMessage(message));
  }

  @Get("${micronaut.base.path}/private/messages")
  public HttpResponse<List<MessageEntity>> getAllMessages() {
    return HttpResponse.ok(messageService.getAllMessages());
  }

  @Delete("${micronaut.base.path}/private/messages")
  public HttpResponse<Void> deleteAllMessages() {
    messageService.deleteAllMessages();
    return HttpResponse.ok();
  }
}

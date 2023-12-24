package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.MessageDto;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public MessageDto sendMessage(@Payload MessageDto chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public MessageDto addUser(
            @Payload MessageDto chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/chat.sendPrivateMessage")
    public MessageDto getPrivateMessage(MessageDto message) throws InterruptedException {
        messagingTemplate.convertAndSendToUser(message.getReceiver(), "/private", message);
        return message;
    }
}

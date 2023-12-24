package com.afpa.kawaa.controller;


import com.afpa.kawaa.dto.MessageDto;
import com.afpa.kawaa.dto.MessagePostDto;
import com.afpa.kawaa.exception.MessagePostDtoNotNullException;
import com.afpa.kawaa.service.FirebaseService;
import com.afpa.kawaa.service.MessageService;
import io.jsonwebtoken.io.IOException;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/message")
@Slf4j
public class MessageController {
    private final MessageService messageService;

    @GetMapping("/{id_conversation}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<List<MessageDto>> getMessagesByIdConversation(@PathVariable Long id_conversation){
        return ResponseEntity.ok(messageService.getMessageByIdConversation(id_conversation));
    }

    @PostMapping
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<MessagePostDto> newMessage(@RequestBody MessagePostDto message){
        return ResponseEntity.ok(messageService.save(message));
    }

    @PostMapping("/file")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<MessagePostDto> newMessageWithFile(
            @RequestParam() MultipartFile file,
            @ModelAttribute MessagePostDto messagePostDto) throws IOException {

        if(file == null) {
            throw new MessagePostDtoNotNullException("File is null");
        }
        return ResponseEntity.ok(messageService.save(messagePostDto, file));
    }
}

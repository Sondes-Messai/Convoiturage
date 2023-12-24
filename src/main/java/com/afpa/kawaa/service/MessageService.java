package com.afpa.kawaa.service;

import com.afpa.kawaa.dto.MessageDto;
import com.afpa.kawaa.dto.MessagePostDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MessageService {
    List<MessageDto> getMessageByIdConversation(Long id_conversation);

    MessagePostDto save(MessagePostDto messagePostDto);

    MessagePostDto save(MessagePostDto messagePostDto, MultipartFile file);
}

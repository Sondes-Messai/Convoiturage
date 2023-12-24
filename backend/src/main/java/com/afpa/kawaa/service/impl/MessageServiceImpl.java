package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.Message;
import com.afpa.kawaa.dto.MessageDto;
import com.afpa.kawaa.dto.MessagePostDto;
import com.afpa.kawaa.dto.mapper.MessageMapper;
import com.afpa.kawaa.dto.mapper.MessagePostMapper;
import com.afpa.kawaa.repository.MessageRepository;
import com.afpa.kawaa.service.FirebaseService;
import com.afpa.kawaa.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;
    private final MessagePostMapper messagePostMapper;
    private final FirebaseService firebaseService;
    @Override
    public List<MessageDto> getMessageByIdConversation(Long id_conversation) {
        return messageRepository.getMessagesByConversationId(id_conversation).stream().map(messageMapper::toDto).toList();
    }

    @Override
    public MessagePostDto save(MessagePostDto messagePostDto) {
        return messagePostMapper.toDto(messageRepository.save(messagePostMapper.toEntity(messagePostDto)));
    }

    @Override
    public MessagePostDto save(MessagePostDto messagePostDto, MultipartFile file) {

        String url = firebaseService.saveFile(file, "files");
        Message message = messagePostMapper.toEntity(messagePostDto);
        message.setFileUrl(url);
        return messagePostMapper.toDto(messageRepository.save(message));
    }
}

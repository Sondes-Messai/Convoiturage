package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.Conversation;
import com.afpa.kawaa.dto.ConversationDto;
import com.afpa.kawaa.dto.mapper.ConversationMapper;
import com.afpa.kawaa.exception.ConversationNotFoundException;
import com.afpa.kawaa.repository.ConversationRepository;
import com.afpa.kawaa.service.ConversationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final ConversationMapper conversationMapper;
    @Override
    public List<ConversationDto> getByUserId(Long userId) {
        return conversationRepository.getAllByUsersId(userId).stream().map(conversationMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ConversationDto findById(Long id) throws ConversationNotFoundException {
        log.debug("Recherche de la conversation par identifiant {}", id);
        Conversation conversation = conversationRepository.findById(id).orElseThrow(ConversationNotFoundException::new);
        return conversationMapper.toDto(conversation);
    }

    @Override
    public List<ConversationDto> findAll() {
        return conversationRepository.findAll().stream().map(conversationMapper::toDto).collect(Collectors.toList());
    }

}

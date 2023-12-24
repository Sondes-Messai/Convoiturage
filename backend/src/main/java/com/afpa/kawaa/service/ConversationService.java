package com.afpa.kawaa.service;

import com.afpa.kawaa.dto.ConversationDto;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.exception.ConversationNotFoundException;

import java.util.List;

public interface ConversationService {
    List<ConversationDto> getByUserId(Long userId);

    List<ConversationDto> findAll();

    ConversationDto findById(Long idChat) throws ConversationNotFoundException;
}

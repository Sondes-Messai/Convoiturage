package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Conversation;
import com.afpa.kawaa.dto.ConversationDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ConversationMapper {

    Conversation toEntity(ConversationDto conversationDto);

    ConversationDto toDto(Conversation conversation);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Conversation partialUpdate(ConversationDto conversationDto, @MappingTarget Conversation conversation);
}
package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Message;
import com.afpa.kawaa.dto.MessagePostDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessagePostMapper {
    @Mapping(source = "conversationId", target = "conversation.id")
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "userMatricule", target = "user.matricule")
    Message toEntity(MessagePostDto messagePostDto);

    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "fileUrl", target = "fileUrl")
    MessagePostDto toDto(Message message);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Message partialUpdate(MessagePostDto messagePostDto, @MappingTarget Message message);
}
package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Message;
import com.afpa.kawaa.dto.MessageDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface MessageMapper {


    Message toEntity(MessageDto messageDto);

    @Mapping(source = "createdDate", target = "date")
    @Mapping(source = "user.matricule", target = "sender")
    @Mapping(source = "fileUrl", target = "fileUrl")
    MessageDto toDto(Message message);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Message partialUpdate(MessageDto messageDto, @MappingTarget Message message);
}
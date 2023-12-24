package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Color;
import com.afpa.kawaa.dto.ColorDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ColorMapper {
    Color toEntity(ColorDto colorDto);

    ColorDto toDto(Color color);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Color partialUpdate(ColorDto colorDto, @MappingTarget Color color);
}

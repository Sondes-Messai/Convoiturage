package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.controller.CoordinateDto;
import com.afpa.kawaa.domain.Coordinates;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {RideMapper.class})
public interface CoordinatesMapper {
    Coordinates toEntity(CoordinateDto coordinateDto);

    CoordinateDto toDto(Coordinates coordinates);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Coordinates partialUpdate(CoordinateDto coordinateDto, @MappingTarget Coordinates coordinates);
}
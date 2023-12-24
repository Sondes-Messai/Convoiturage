package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.dto.PictureDto;
import com.afpa.kawaa.domain.Picture;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PictureMapper {
    Picture toEntity(PictureDto pictureDto);

    PictureDto toDto(Picture picture);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Picture partialUpdate(PictureDto pictureDto, @MappingTarget Picture picture);
}
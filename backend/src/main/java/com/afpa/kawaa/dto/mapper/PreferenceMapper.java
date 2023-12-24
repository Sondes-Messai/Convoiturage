package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.dto.PreferenceDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface PreferenceMapper {
    @Mapping(source = "pictureUrl", target = "picture.url")
    Preference toEntity(PreferenceDto preferenceDto);

    @Mapping(source = "picture.url", target = "pictureUrl")
    PreferenceDto toDto(Preference preference);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "pictureUrl", target = "picture.url")
    Preference partialUpdate(PreferenceDto preferenceDto, @MappingTarget Preference preference);

}
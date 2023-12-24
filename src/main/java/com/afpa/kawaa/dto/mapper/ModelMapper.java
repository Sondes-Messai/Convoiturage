package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Model;
import com.afpa.kawaa.dto.ModelDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface ModelMapper {
    @Mapping(source = "brandName", target = "brand.name")
    Model toEntity(ModelDto modelDto);

    @Mapping(source = "brand.name", target = "brandName")
    ModelDto toDto(Model model);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "brandName", target = "brand.name")
    Model partialUpdate(ModelDto modelDto, @MappingTarget Model model);
}
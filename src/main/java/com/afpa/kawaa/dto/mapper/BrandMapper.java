package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.dto.BrandDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface BrandMapper {
    Brand toEntity(BrandDto brandDto);

    BrandDto toDto(Brand brand);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Brand partialUpdate(BrandDto brandDto, @MappingTarget Brand brand);
}
package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Address;
import com.afpa.kawaa.dto.AddressDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface AddressMapper {
    Address toEntity(AddressDto addressDto);

    @Mapping(source = "id", target = "id")
    AddressDto toDto(Address address);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Address partialUpdate(AddressDto addressDto, @MappingTarget Address address);
}
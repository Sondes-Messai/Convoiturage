package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.domain.ContactUsResponse;
import com.afpa.kawaa.dto.ContactUsFormDto;
import com.afpa.kawaa.dto.ContactUsResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ContactUsResponseMapper {
    ContactUsResponse toEntity(ContactUsResponseDto contactUsResponseDto);

    ContactUsResponseDto toDto(ContactUsResponse contactUsResponse);
}

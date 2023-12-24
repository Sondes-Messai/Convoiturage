package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.dto.ContactUsFormDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ContactUsFormMapper {


    ContactUsForm toEntity(ContactUsFormDto contactUsFormDto);

    ContactUsFormDto toDto(ContactUsForm contactUsForm);


}
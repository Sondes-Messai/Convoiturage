package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.ContactUsResponse;
import com.afpa.kawaa.dto.ContactUsResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactUsResponseService {
    List<ContactUsResponse> findAllById(Long contactUsFormId);
    ContactUsResponse create(ContactUsResponse contactUsResponse);

}

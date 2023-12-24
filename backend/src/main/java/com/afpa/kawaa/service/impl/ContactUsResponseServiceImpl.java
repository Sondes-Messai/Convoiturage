package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.ContactUsResponse;
import com.afpa.kawaa.dto.ContactUsResponseDto;
import com.afpa.kawaa.dto.mapper.ContactUsResponseMapper;
import com.afpa.kawaa.repository.ContactUsResponseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ContactUsResponseServiceImpl {
    private final ContactUsResponseRepository contactUsResponseRepository;
    private final ContactUsResponseMapper contactUsResponseMapper;

    public ContactUsResponse create(ContactUsResponse contactUsResponse) {
        return contactUsResponseRepository.save(contactUsResponse);
    }

    public List<ContactUsResponseDto> findAllById (Long contactUsFormId) {
        return contactUsResponseRepository.findAllById(contactUsFormId).stream().map(contactUsResponseMapper::toDto).toList();
    }
}

package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.dto.ContactUsFormDto;
import com.afpa.kawaa.exception.ContactUsFormNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public interface ContactUsFormService {
    ContactUsFormDto getById(Long id) throws ContactUsFormNotFoundException;

    List<ContactUsFormDto> findAll();
    ContactUsForm findById(Long id) throws ContactUsFormNotFoundException;

    ContactUsForm create(ContactUsFormDto contactUsFormDto);

    public void deleteById(Long id);

    ContactUsForm save(ContactUsForm contactUsForm);

    Page<ContactUsForm> findContactUsFormByStatus(Pageable page, Boolean status);

    String archiveChanged(Long id) throws ContactUsFormNotFoundException;

    List<Object[]> countContactByCreationDate();

    List<Object[]> countTreatedContactByCreationDate();

    List<Object[]> treatmentTime();
}

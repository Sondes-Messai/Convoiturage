package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.ContactUsResponseDto;
import com.afpa.kawaa.service.impl.ContactUsResponseServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
@RequestMapping("api/v1/contact_us_response")
public class ContactUsReponseController {
    private final ContactUsResponseServiceImpl contactUsResponseService;

    @Autowired
    public ContactUsReponseController(ContactUsResponseServiceImpl contactUsResponseService) {
        this.contactUsResponseService = contactUsResponseService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ContactUsResponseDto>> findAllById(@PathVariable Long id) {
        return ResponseEntity.ok(contactUsResponseService.findAllById(id));
    }
}

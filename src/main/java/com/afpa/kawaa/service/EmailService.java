package com.afpa.kawaa.service;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {

    public void sendConfirmationEmail(String to, String subject, String message);
}

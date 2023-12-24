package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendConfirmationEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(to);
            mail.setSubject(subject);
            mail.setText(message);
            javaMailSender.send(mail);
            log.info("mail sent ...");
        } catch (Exception e) {
            log.error("mail not sent" + e.getMessage(), e);
            throw new RuntimeException(e.getMessage());
        }

    }
    public void sendResponseEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(to);
            mail.setSubject(subject);
            mail.setText(message);
            javaMailSender.send(mail);
            log.info("response sent ...");
        } catch (Exception e) {
            log.error("mail not sent" + e.getMessage(), e);
            throw new RuntimeException(e.getMessage());
        }

    }
}

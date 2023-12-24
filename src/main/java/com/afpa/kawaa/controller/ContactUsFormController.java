package com.afpa.kawaa.controller;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.domain.ContactUsResponse;
import com.afpa.kawaa.dto.ContactUsFormDto;
import com.afpa.kawaa.exception.ContactUsFormNotFoundException;
import com.afpa.kawaa.exception.ContactUsFormNotNullException;
import com.afpa.kawaa.exception.EmailSendException;
import com.afpa.kawaa.service.ContactUsFormService;
import com.afpa.kawaa.service.FirebaseService;
import com.afpa.kawaa.service.impl.ContactUsResponseServiceImpl;
import com.afpa.kawaa.service.impl.EmailServiceImpl;
import io.netty.channel.local.LocalChannel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
@RequestMapping("api/v1/contact_us")
public class ContactUsFormController {
    public final ContactUsFormService contactUsFormService;
    private final FirebaseService firebaseService;
    private final EmailServiceImpl emailService;
    private final ContactUsResponseServiceImpl contactUsResponseService;
    String messageDeConfirmation = "Bonjour," +
            "Nous accusons réception de votre message. Nous reviendrons vers vous le plus rapidement possible." +
            "Cordialement" +
            "L'équipe Kawaa";

    @Autowired
    public ContactUsFormController(ContactUsFormService contactUsFormService, ContactUsResponseServiceImpl contactUsResponseService, FirebaseService firebaseService, EmailServiceImpl emailService) {
        this.contactUsFormService = contactUsFormService;
        this.contactUsResponseService = contactUsResponseService;
        this.firebaseService = firebaseService;
        this.emailService = emailService;
    }

    @GetMapping("")
    public List<ContactUsFormDto> findAll() {
        return contactUsFormService.findAll();
    }

    @GetMapping("/{id}")
    public ContactUsForm findById(@PathVariable("id") Long id) throws ContactUsFormNotFoundException {
        return contactUsFormService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<ContactUsForm> createContactUsFormNoFile(
            @RequestBody ContactUsFormDto contactUsFormDto
    ) throws IOException, EmailSendException {
        log.info("REST REQUEST TO ACCESS CreateContactUs without file !!!!!!!!!!!");
        log.info("email address" + contactUsFormDto.email());

        ContactUsForm createdContactUsForm = contactUsFormService.create(contactUsFormDto);
        try {
            emailService.sendConfirmationEmail(contactUsFormDto.email(), "Prise de contact - Kawaa", messageDeConfirmation);

        } catch (MailException e) {
            log.error("mail not sent" + e.getMessage(), e);
            throw new EmailSendException("mail not sent", e);
        }
        return ResponseEntity.ok(contactUsFormService.save(createdContactUsForm));
    }
    @PostMapping("/file")
    public ResponseEntity<ContactUsForm> createContactUsForm(
            @RequestParam() MultipartFile file,
            @ModelAttribute ContactUsFormDto contactUsFormDto
    ) throws IOException, EmailSendException {

        log.info("REST REQUEST TO ACCESS CreateContactUs" + file);
        log.info("email address" + contactUsFormDto.email());
        if(file == null) {
            throw new ContactUsFormNotNullException("File is null");
        }

            String url = firebaseService.saveFile(file, "files");
            ContactUsForm createdContactUsForm = contactUsFormService.create(contactUsFormDto);
            createdContactUsForm.setFileUrl(url);

            try {
                emailService.sendConfirmationEmail(contactUsFormDto.email(), "Prise de contact - Kawaa", messageDeConfirmation);

            } catch (MailException e) {
                log.error("mail not sent" + e.getMessage(), e);
                throw new EmailSendException("mail not sent", e);
            }
        return ResponseEntity.ok(contactUsFormService.save(createdContactUsForm));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<ContactUsForm> updateContactUsForm(@PathVariable("id") Long id, @RequestBody String response
    ) throws IOException, EmailSendException, ContactUsFormNotFoundException {
        log.info("REST REQUEST TO ACCESS response");

        //on récupère le formulaire existant
        ContactUsForm responseContactUsForm = contactUsFormService.findById(id);

        //on crée une réponse
        ContactUsResponse contactUsResponse = new ContactUsResponse();
        contactUsResponse.setSubject("Réponse à votre formulaire de contact");
        contactUsResponse.setContent(response);
        contactUsResponse.setContact_us(responseContactUsForm);

        contactUsResponseService.create(contactUsResponse);

        //on envoie un email
        try {
            emailService.sendResponseEmail(responseContactUsForm.getEmail(), contactUsResponse.getSubject(), response);

        } catch (MailException e) {
            log.error("mail not sent" + e.getMessage(), e);
            throw new EmailSendException("mail not sent", e);
        }
        return ResponseEntity.ok(contactUsFormService.save(responseContactUsForm));
    }

    @PostMapping("/archiv/{id}")
    public ResponseEntity<String> archiveContactUsForm(@PathVariable("id") Long id
    ) throws ContactUsFormNotFoundException {

        return ResponseEntity.ok(contactUsFormService.archiveChanged(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ContactUsForm>> getArchivedForms (Integer number, Integer size, String direction, String property){
        Sort.Direction sort = direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable page = PageRequest.of(number, size, Sort.by(sort, property));
        Boolean status = true;
        return ResponseEntity.ok(contactUsFormService.findContactUsFormByStatus(page, status));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        contactUsFormService.deleteById(id);
    }

    /**
     * récupère tous les formulaires de contact
     * @return
     */
    @GetMapping(value="/stat/date")
    public List<Object[]> getAllContactsByDate() {
       return contactUsFormService.countContactByCreationDate();
    }

    /**
     * récupère les formulaires de contact traités
     * @return
     */
    @GetMapping(value="/stat/treated")
    public List<Object[]> getTreatedContactsByDate() {
        return contactUsFormService.countTreatedContactByCreationDate();
    }

    /**
     * récupère les dates des formulaires et des réponses et calcule le temps moyen de traitement
     * @return
     */
    @GetMapping(value="/stat/time")
    public double getTreatmentTime() {
        double time = 0;
        List<Object[]> treatmentTimes = contactUsFormService.treatmentTime();
        int count = 0;
        long totalDays = 0;

        for (Object[] treatment : treatmentTimes) {
            LocalDateTime createdDate = (LocalDateTime) treatment[1];
            LocalDateTime responseDate = (treatment[2] != null) ? ((LocalDateTime) treatment[2]) : LocalDateTime.now();

            long days = ChronoUnit.DAYS.between(createdDate, responseDate);
            totalDays += days;
            count++;
        }
        time = (count > 0) ? ((double) totalDays / count) : 0;
        return time;
    }
}

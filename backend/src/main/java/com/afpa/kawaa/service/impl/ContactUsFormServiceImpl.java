package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.ContactUsForm;
import com.afpa.kawaa.dto.ContactUsFormDto;
import com.afpa.kawaa.dto.mapper.ContactUsFormMapper;
import com.afpa.kawaa.exception.ContactUsFormNotFoundException;
import com.afpa.kawaa.repository.ContactUsFormRepository;
import com.afpa.kawaa.service.ContactUsFormService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import java.util.stream.Collectors;


/**
 * Service de gestion des formulaires de contact
 */
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ContactUsFormServiceImpl implements ContactUsFormService {
    private final ContactUsFormRepository contactUsFormRepository;
    private final ContactUsFormMapper contactUsFormMapper;


    /**
     * Récupère un formulaire de contact dto par son id
     *
     * @param id L'Id du formulaire à récupérer
     * @return Le formulaire ou null si non trouvé
     * @throws ContactUsFormNotFoundException
     */
    @Override
    public ContactUsFormDto getById(Long id) throws ContactUsFormNotFoundException {
        return contactUsFormMapper.toDto(findById(id));
    }

    /**
     * Récupère tous les formulaires de contact
     *
     * @return Liste de formulaires
     */
    @Override
    public List<ContactUsFormDto> findAll() {
        return contactUsFormRepository.findAll().stream().map(contactUsFormMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Récupère un formulaire par son id
     *
     * @param id L'Id du formulaire à récupérer
     * @return Le formulaire ou null si non trouvé
     */
    @Override
    public ContactUsForm findById(Long id) throws ContactUsFormNotFoundException {
        return contactUsFormRepository.findById(id).orElseThrow(ContactUsFormNotFoundException::new);
    }

    /**
     * Crée un nouveau formulaire de contact
     *
     * @param contactUsFormDto Le formulaire à créer
     * @return Le formulaire créé
     */
    @Override
    public ContactUsForm create(ContactUsFormDto contactUsFormDto) {
        return contactUsFormRepository.save(contactUsFormMapper.toEntity(contactUsFormDto));
    }

    /**
     * Supprime un formulaire de contact par son id
     *
     * @param id l'Id du formulaire à supprimer
     */
    @Override
    public void deleteById(Long id) {
        contactUsFormRepository.deleteById(id);
    }

    /**
     * Enregistre un formulaire de contact
     *
     * @param contactUsForm
     */
    @Override
    public ContactUsForm save(ContactUsForm contactUsForm) {
        return null;
    }

    @Override
    public Page<ContactUsForm> findContactUsFormByStatus(Pageable page, Boolean status) {
        return contactUsFormRepository.findContactUsFormByStatus(page, status);
    }

    @Override
    public String archiveChanged(Long id) throws ContactUsFormNotFoundException {
        ContactUsForm contactUsForm = contactUsFormRepository.findById(id).orElseThrow(ContactUsFormNotFoundException::new);
        contactUsForm.setStatus(true);
        contactUsFormRepository.save(contactUsForm);
        return "Contact form status changed";
    }


    public List<Object[]> countContactByCreationDate() {
        return contactUsFormRepository.countContactByCreationDate();
    }

    public List<Object[]> countTreatedContactByCreationDate() {
        return contactUsFormRepository.countTreatedContactByCreationDate();
    }

    /**
     * récupère les date de creation des formulaires et date de réponse
     *
     * @return
     */
    public List<Object[]> treatmentTime() {
        return contactUsFormRepository.treatmentTime();
    }

}

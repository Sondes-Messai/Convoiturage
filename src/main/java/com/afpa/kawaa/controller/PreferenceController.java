package com.afpa.kawaa.controller;

import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.dto.ContactUsFormDto;
import com.afpa.kawaa.dto.PreferenceDto;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.exception.PreferenceNotFoundException;
import com.afpa.kawaa.exception.SiteNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.service.impl.PreferenceServiceImpl;
import com.afpa.kawaa.service.impl.UserServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/preference")
@Slf4j
public class PreferenceController {

    @Autowired
    PreferenceServiceImpl preferenceService;

    @Autowired
    UserServiceImpl userService;

    /**
     * Cette méthode permet de récupérer toutes les préférences.
     *
     * @return ResponseEntity contenant un ensemble (Set) d'objets PreferenceDto.
     */
    @GetMapping
    public ResponseEntity<Set<PreferenceDto>> getAll() {
        return ResponseEntity.ok(preferenceService.getAll());
    }

    @PostMapping
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<Preference> addNewPreference(
            @RequestParam() MultipartFile file,
            @ModelAttribute PreferenceDto preferenceDto) throws IOException {
        return ResponseEntity.ok(preferenceService.save(preferenceDto, file));
    }

    @PostMapping("/archived/{label}")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<String> archiveChanged(@PathVariable String label) throws PreferenceNotFoundException {
        return ResponseEntity.ok(preferenceService.archiveChanged(label));
    }

    @PostMapping("/visibility/{label}")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<String> visibilityChanged(@PathVariable String label) throws PreferenceNotFoundException {
        return ResponseEntity.ok(preferenceService.visibilityChanged(label));
    }

    @PostMapping("/update/{label}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<String> updatePreferenceIcon(@PathVariable String label,  @RequestParam() MultipartFile file ) throws IOException, PreferenceNotFoundException {
        return ResponseEntity.ok(preferenceService.updatePreferenceIcon(label, file));
    }

    /**
     * Cette méthode permet de mettre à jour les préférences d'un utilisateur.
     *
     * @param s              L'identifiant de l'utilisateur.
     * @param preferenceDtos L'ensemble des préférences à mettre à jour.
     * @return Un ensemble (Set) d'objets PreferenceDto mis à jour.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @PutMapping("/update/{s}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public Set<PreferenceDto> updatePreferenceUser(@PathVariable String s, @RequestBody Set<PreferenceDto> preferenceDtos) throws UserNotFoundException {
        log.debug("Mise à jour des préférences {}", preferenceDtos);
        return preferenceService.updateUserPreferences(s, preferenceDtos);
    }

    /**
     * Cette méthode permet de récupérer les préférences d'un utilisateur par son adresse e-mail ou son matricule.
     *
     * @param s L'adresse e-mail ou le matricule de l'utilisateur.
     * @return Un ensemble (Set) d'objets PreferenceDto correspondant aux préférences de l'utilisateur.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @GetMapping("/user-matricule/{s}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public Set<PreferenceDto> getUserPreferenceByEmailOrMatricule(@PathVariable String s) throws UserNotFoundException {
        log.debug("Obtention des préférences par adresse e-mail ou matricule {}", s);
        return userService.getUserPreferenceByEmailOrMatricule(s);
    }

}

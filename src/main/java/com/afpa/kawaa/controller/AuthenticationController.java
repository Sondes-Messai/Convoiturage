package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.ColorDto;
import com.afpa.kawaa.exception.PreferenceNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.security.auth.AuthenticationRequest;
import com.afpa.kawaa.security.auth.AuthenticationResponse;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.service.PreferenceService;
import com.afpa.kawaa.service.UserService;
import com.afpa.kawaa.service.impl.AuthenticationService;
import com.afpa.kawaa.service.impl.CarServiceImpl;
import com.afpa.kawaa.service.impl.ColorServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserService userService;
    private final CarServiceImpl carService;
    private final ColorServiceImpl colorService;
    private final PreferenceService preferenceService;



    /**
     * Cette méthode effectue l'enregistrement d'un utilisateur
     * @param userAddDto {Object} contient les informations de l'utilisateur qui souhaite s'enregistrer,
     *                   tel que : ( nom, prénom, email, mot de passe, photo de profil, numéro de téléphone,
     *                   matricule Afpa, liste de préférences, voiture )
     *
     * @return Cette méthode retourne une AuthenticationResponse qui contient un token
     * */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDto userAddDto) {
        return ResponseEntity.ok(service.register(userAddDto));
    }

    /**
     * Cette méthode effectue l'authentification d'un utilisateur
     * @param request {Object} request contient les informations d'authentification de l'utilisateur
     *                tel que : ( email, mot de passe, se souvenir de moi )
     *
     * @return Cette méthode retourne une AuthenticationResponse qui contient un token
     * */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/exist-email/{email}")
    public ResponseEntity<Boolean> findByEmail(@PathVariable String email) throws UserNotFoundException {
        log.debug("Finding review by uuid {}", email);
        return ResponseEntity.ok(userService.existByEmail(email));
    }

    @GetMapping("/exist-label/{label}")
    public ResponseEntity<Boolean> findByLabel(@PathVariable String label) throws PreferenceNotFoundException {
        log.debug("Finding review by uuid {}", label);
        return ResponseEntity.ok(preferenceService.existByLabel(label));
    }

    @GetMapping("exist-matriculation/{licensePlate}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public  ResponseEntity<Boolean> findByLicensePlate(@PathVariable (value = "licensePlate") String licensePlate){
        log.debug("Exist {}", licensePlate);
        return ResponseEntity.ok(carService.existByLicensePlate(licensePlate));
    }

    @GetMapping(value = "/color/allColors")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<List<ColorDto>> getAllColors() {
        return ResponseEntity.ok(colorService.getAllColors());
    }

}

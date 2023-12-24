package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.AddressDto;
import com.afpa.kawaa.service.AddressService;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur pour la gestion des adresses des trajets.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/address")
@Slf4j
public class AddressController {
    private final AddressService addressService;


    /**
     * Récupère toutes les adresses.
     * @return Liste des adresses.
     */
    @GetMapping
    @RolesAllowed({"USER","SUPER","ADMIN"})
    public ResponseEntity<List<AddressDto>> getAllAddresses() {
        List<AddressDto> addresses = addressService.getAll();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }


    /**
     * Crée une nouvelle adresse.
     * @param addressDTO Les données de l'adresse à créer.
     * @return L'adresse créée, ou une réponse 201 si réussie.
     */
    @PostMapping
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<AddressDto> createAddress(@RequestBody AddressDto addressDTO) {
        AddressDto createdAddress = addressService.create(addressDTO);
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }



}

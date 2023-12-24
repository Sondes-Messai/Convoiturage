package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.BrandDto;
import com.afpa.kawaa.service.impl.BrandServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/brand")
public class BrandController {


    private final BrandServiceImpl brandService;

    /**
     * contrôleur de la méthode permettant de récupérer la liste de toutes les marques
     * @param search champs de rechercher permettant de filtrer la liste des marques
     * @return la liste des marques
     */
    @GetMapping(value = "/search")
    public ResponseEntity<List<BrandDto>> getAllBrandWithSearch (String search){
        return ResponseEntity.ok(brandService.getAllBrandWithSearch(search));
    }
}

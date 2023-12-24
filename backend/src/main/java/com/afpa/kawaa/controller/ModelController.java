package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.ModelDto;
import com.afpa.kawaa.exception.ModelNotFoundException;
import com.afpa.kawaa.service.impl.ModelServiceImpl;
import com.afpa.kawaa.service.impl.RideServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/model")
public class ModelController {


    private final ModelServiceImpl modelService;
    private static final Logger logger = LoggerFactory.getLogger(ModelController.class);

    /**
     * contrôleur de la méthode permettant de récupérer la liste de tous les modèles
     * @param search champs de rechercher permettant de filtrer la liste des modèles
     * @return la liste des modèle
     */
    @GetMapping(value = "/search-brand")
    public ResponseEntity<Set<ModelDto>> getAllByBrandName(String brandName, String search) throws ModelNotFoundException {
        logger.info("entrée fonction search model from brand");
        return ResponseEntity.ok(modelService.getAllModelsByBrandName(brandName,search));
    }

}

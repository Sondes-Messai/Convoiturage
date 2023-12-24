package com.afpa.kawaa.service;

import com.afpa.kawaa.dto.ModelDto;
import com.afpa.kawaa.exception.ModelNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;

import java.util.List;
import java.util.Set;

public interface ModelService {

    Page<ModelDto> findAll(Pageable pageable);

    /**
     * méthode pour rechercher tous les modèles d'une marque avec un champs de recherche
     * @param search champs de recherche
     * @return returns la liste complète de tous les modèles ou la liste filtrée
     */
    Set<ModelDto> getAllModelsByBrandName(String brand, String search) throws ModelNotFoundException;


}

package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.dto.BrandDto;
import com.afpa.kawaa.exception.BrandNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BrandService {

    Page<BrandDto> findAll(Pageable pageable);

    Brand findBrandByName (String name) throws BrandNotFoundException;

    /**
     * méthode pour rechercher toutes les marques avec un champs de recherche
     * @param search champs de recherche
     * @return returns la liste complète d toutes les marques ou la liste filtrée
     */
    List<BrandDto> getAllBrandWithSearch (String search);


}

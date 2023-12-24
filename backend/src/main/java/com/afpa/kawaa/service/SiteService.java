package com.afpa.kawaa.service;


import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.exception.SiteNotFoundException;

import java.util.Optional;
import java.util.Set;

public interface SiteService {

    Set<SiteDto> getAll();
    Site save(SiteDto siteDto);
    String updateVisibility(Long id, SiteDto siteDto) throws SiteNotFoundException;
    SiteDto deleteById(Long id) throws SiteNotFoundException;

    Site findByName(String workSite);
}

package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.dto.mapper.SiteMapper;

import com.afpa.kawaa.exception.SiteNotFoundException;
import com.afpa.kawaa.repository.SiteRepository;
import com.afpa.kawaa.service.SiteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;
    private final SiteMapper siteMapper;
    @Override
    public Set<SiteDto> getAll() {
        return siteRepository.findAll().stream().map(siteMapper::toDto).collect(Collectors.toSet());
    }

    @Override
    public Site save(SiteDto siteDto) {
        Site site = siteMapper.toEntity(siteDto);
        return siteRepository.save(site);
    }

    @Override
    public String updateVisibility(Long id, SiteDto siteDto) throws SiteNotFoundException {

          Site site = siteRepository.findById(id).orElseThrow(SiteNotFoundException::new);
          site.setVisibility(siteDto.visibility());
          siteRepository.save(site);
          return "Site correctement modifié";
    }

    @Override
    public SiteDto deleteById(Long id) throws SiteNotFoundException {
        Site site = siteRepository.findById(id).orElseThrow(SiteNotFoundException::new);
        siteRepository.delete(site);
        return siteMapper.toDto(site);
    }

    @Override
    public Site findByName(String town) {
        Site site = siteRepository.findByTown(town);
        return site;
    }


}

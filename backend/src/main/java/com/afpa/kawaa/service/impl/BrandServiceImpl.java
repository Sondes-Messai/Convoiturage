package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.dto.BrandDto;
import com.afpa.kawaa.dto.mapper.BrandMapper;
import com.afpa.kawaa.exception.BrandNotFoundException;
import com.afpa.kawaa.repository.BrandRepository;
import com.afpa.kawaa.repository.ModelRepository;
import com.afpa.kawaa.service.BrandService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    private  final ModelRepository modelRepository;

    private final BrandMapper brandMapper;

    @Override
    public Page<BrandDto> findAll(Pageable pageable) {
        return new PageImpl<>(brandRepository.findAll(pageable).stream().map(brandMapper::toDto).collect(Collectors.toList()));
    }

    @Override
    public Brand findBrandByName(String name) throws BrandNotFoundException {
        log.debug("Finding brand by name {}",name);
        return brandRepository.findById(name).orElseThrow(BrandNotFoundException::new);
    }

    @Override
    public List<BrandDto> getAllBrandWithSearch(String search) {
        return brandRepository.findByNameLike("%"+search+"%").stream().map(brandMapper::toDto).collect(Collectors.toList());
    }
}

package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.controller.ModelController;
import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.domain.Model;
import com.afpa.kawaa.dto.ModelDto;
import com.afpa.kawaa.dto.mapper.ModelMapper;
import com.afpa.kawaa.exception.ModelNotFoundException;
import com.afpa.kawaa.repository.BrandRepository;
import com.afpa.kawaa.repository.ModelRepository;
import com.afpa.kawaa.service.ModelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ModelServiceImpl implements ModelService {

    private final ModelRepository modelRepository;

    private final ModelMapper modelMapper;

    private final BrandRepository brandRepository;

    private static final Logger logger = LoggerFactory.getLogger(ModelServiceImpl.class);



    @Override
    public Page<ModelDto> findAll(Pageable pageable) {
        return new PageImpl<>(modelRepository.findAll(pageable).stream().map(modelMapper::toDto).collect(Collectors.toList()));
    }

    @Override
    public Set<ModelDto> getAllModelsByBrandName(String brandName, String search) throws ModelNotFoundException {
        logger.info("brandName : " + brandName);
        logger.info("search : " + search);
        Brand brandDB = brandRepository.findById(brandName).orElseThrow(ModelNotFoundException::new);
        logger.info("brandDB : " + brandDB);
        List<Model> modelEntities = modelRepository.findAllByBrandEntityAndModelContaining(brandDB, "%"+search+"%");
        logger.info("modelEntities : " + modelEntities);
        logger.info("modelEntities.map : " + modelEntities.stream().map(modelMapper::toDto).toList());
        return modelEntities.stream().map(modelMapper::toDto).collect(Collectors.toSet());
    }


}

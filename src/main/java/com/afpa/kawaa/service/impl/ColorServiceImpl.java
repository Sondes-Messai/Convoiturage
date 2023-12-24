package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.dto.ColorDto;
import com.afpa.kawaa.dto.mapper.ColorMapper;
import com.afpa.kawaa.repository.ColorRepository;
import com.afpa.kawaa.service.ColorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ColorServiceImpl implements ColorService {

    private final ColorRepository colorRepository;

    private final ColorMapper colorMapper;

    @Override
    public List<ColorDto> getAllColors() {
        return colorRepository.findAll().stream().map(colorMapper::toDto).collect(Collectors.toList());
    }
}

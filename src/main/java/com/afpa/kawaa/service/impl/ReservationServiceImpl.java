package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.domain.Reservation;
import com.afpa.kawaa.dto.ReservationDto;
import com.afpa.kawaa.dto.mapper.ReservationMapper;
import com.afpa.kawaa.repository.ReservationRepository;
import com.afpa.kawaa.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    @Override
    public Set<ReservationDto> getAll() {
        return reservationRepository.findAll().stream().map(reservationMapper::toDto).collect(Collectors.toSet());
    }

    @Override
    public Set<ReservationDto> getByUser(Long id) {
        return reservationRepository.getByUser(id).stream().map(reservationMapper::toDto).collect(Collectors.toSet());
    }

    @Override
    public ReservationDto save(ReservationDto reservationDto) {
        Reservation reservation = reservationMapper.toEntity(reservationDto);
        return reservationMapper.toDto(reservationRepository.save(reservation));
    }
}

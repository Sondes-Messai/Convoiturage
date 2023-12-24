package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.Reservation;
import com.afpa.kawaa.dto.ReservationDto;

import java.util.List;
import java.util.Set;

public interface ReservationService {

    ReservationDto save(ReservationDto reservationDto);

    Set<ReservationDto> getAll();

    Object getByUser(Long id);
}

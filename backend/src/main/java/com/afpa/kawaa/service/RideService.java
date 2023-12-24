package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.Ride;
import com.afpa.kawaa.dto.RideDto;
import com.afpa.kawaa.dto.RideSearch;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.RideNotFoundException;

import java.util.List;

public interface RideService {
    List<RideDto> getAll();

    RideDto getById(Long id) throws RideNotFoundException;

    Ride create(RideDto rideDto) throws CarNotFoundException;

    RideDto update(Long id, RideDto rideDto) throws RideNotFoundException;

    boolean delete(Long id);

    List<RideDto> getDailyRidesByDateAndTown(RideSearch ridesearch);

    List<Ride> getAllRegularRides(RideDto rideDto);

    List<Object[]> countRidesByType();
}

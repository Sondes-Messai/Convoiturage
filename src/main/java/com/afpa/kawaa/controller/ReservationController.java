package com.afpa.kawaa.controller;


import com.afpa.kawaa.domain.Reservation;
import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.dto.ReservationDto;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.service.impl.ReservationServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reservations")
@Slf4j
public class ReservationController {

    @Autowired
    private ReservationServiceImpl reservationService;

    @GetMapping("/all")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<Set<ReservationDto>> getAll() {
        return ResponseEntity.ok(reservationService.getAll());
    }

    @PostMapping
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<ReservationDto> create(@RequestBody ReservationDto reservationDto){
        return ResponseEntity.ok(reservationService.save(reservationDto));
    }

    @GetMapping("/user/{id}")
    @RolesAllowed({"SUPER","ADMIN","USER"})
    public ResponseEntity<Set<ReservationDto>> getByUser(@PathVariable("id")Long id) {
        return ResponseEntity.ok(reservationService.getByUser(id));
    }
}



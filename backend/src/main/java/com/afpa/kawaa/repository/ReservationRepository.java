package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.Set;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query(value = "SELECT r.* " +
            "FROM reservation r " +
            "WHERE r.user_id = :id " +
            "AND r.status_reserv LIKE 'PENDING' ",
            nativeQuery = true)
    Set<Reservation> getByUser(Long id);
}



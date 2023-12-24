package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Coordinates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoordinatesRepository extends JpaRepository<Coordinates, Long> {
}

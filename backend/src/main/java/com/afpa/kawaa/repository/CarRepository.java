package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {
    Boolean deleteByLicensePlate(String licensePlate);
    Optional<Car> findByLicensePlate(String licensePlate);

    List<Car> findByUser_Id(Long id);

    List<Car> findByUser_Mail(String mail);



}
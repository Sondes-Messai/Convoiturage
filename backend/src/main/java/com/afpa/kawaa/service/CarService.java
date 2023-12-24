package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.Car;
import com.afpa.kawaa.dto.CarDto;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.ModelNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.exception.ValidationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService {

    Page<CarDto> findAll(Pageable pageable);

    List<CarDto> findAllByUserMail(String mail);

    /**
     * Cette méthode permet de supprimer une voiture par son numéro de plaque d'immatriculation.
     *
     * @param licensePlate Le numéro de plaque d'immatriculation de la voiture à supprimer.
     * @return true si la suppression réussit, sinon false.
     * @throws CarNotFoundException Si la voiture n'est pas trouvée.
     */
    Boolean deleteByLicensePlate(String licensePlate) throws CarNotFoundException;

    Boolean existByLicensePlate(String licensePlate);

    CarDto save(Car car) throws ValidationException, UserNotFoundException;

    CarDto update(String licensePlate, CarDto carDto) throws CarNotFoundException, ModelNotFoundException;

    CarDto findByLicensePlate(String licensePlate) throws CarNotFoundException;

    String addImage(Long id, MultipartFile file) throws CarNotFoundException;
}

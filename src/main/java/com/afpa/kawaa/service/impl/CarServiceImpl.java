package com.afpa.kawaa.service.impl;


import com.afpa.kawaa.controller.CarController;
import com.afpa.kawaa.domain.*;
import com.afpa.kawaa.dto.CarDto;
import com.afpa.kawaa.dto.mapper.CarMapper;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.ModelNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.exception.ValidationException;
import com.afpa.kawaa.repository.*;
import com.afpa.kawaa.service.CarService;
import com.afpa.kawaa.service.FirebaseService;
import com.google.api.gax.rpc.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class CarServiceImpl implements CarService {
    private final PictureRepository pictureRepository;

    private final CarRepository carRepository;

    private final ModelRepository modelRepository;

    private  final BrandRepository brandRepository;

    private final FirebaseService firebaseService;

    private final CarMapper carMapper;

    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(CarServiceImpl.class);



    /**
     * Cette méthode permet de récupérer une page de voitures avec pagination.
     *
     * @param pageable Les informations de pagination.
     * @return Une Page d'objets CarDto correspondant aux voitures trouvées.
     */
    @Override
    public Page<CarDto> findAll(Pageable pageable) {


        return carRepository.findAll(pageable).map(carMapper::toDto);
    }


    /**
     * Cette méthode permet de trouver une voiture par son numéro de plaque d'immatriculation.
     *
     * @param licensePlate Le numéro de plaque d'immatriculation de la voiture à rechercher.
     * @return Un objet CarDto correspondant à la voiture trouvée.
     * @throws CarNotFoundException Si la voiture n'est pas trouvée.
     */
    @Override
    public CarDto findByLicensePlate(String licensePlate) throws CarNotFoundException {
        log.debug("Finding Car by matriculation {}", licensePlate);
        Car car = carRepository.findByLicensePlate(licensePlate).orElseThrow(CarNotFoundException::new);
        return carMapper.toDto(car);
    }


    /**
     * Cette méthode permet de trouver toutes les voitures associées à un utilisateur par son adresse e-mail.
     *
     * @param mail L'adresse e-mail de l'utilisateur pour lequel on recherche les voitures.
     * @return Une liste de CarDto correspondant aux voitures trouvées pour l'utilisateur.
     */
    @Override
    public List<CarDto> findAllByUserMail(String mail) {
        return carRepository.findByUser_Mail(mail).stream().map(carMapper::toDto).collect(Collectors.toList());
    }


    @Override
    public Boolean deleteByLicensePlate(String licensePlate) throws CarNotFoundException {
        log.debug("Deleting car by licensePlate {}", licensePlate);
        logger.info("licensePlate : " + licensePlate);
        Optional<Car> carOptional = carRepository.findByLicensePlate(licensePlate);
        if (carOptional.isPresent()) {
            Car car = carOptional.get();
            logger.info("car : " + car);
            carRepository.delete(car);
            return true;
        } else {
            return false;
        }
    }


    /**
     * Cette méthode permet de vérifier si une voiture existe déjà en fonction de son numéro de plaque d'immatriculation.
     *
     * @param licensePlate Le numéro de plaque d'immatriculation de la voiture à vérifier.
     * @return true si la voiture existe, sinon false.
     */
    @Override
    public Boolean existByLicensePlate(String licensePlate) {
    Optional<Car> car = carRepository.findByLicensePlate(licensePlate);
    return car.isPresent();
    }



    /**
     * Cette méthode permet de sauvegarder une voiture avec les données fournies et l'associer à un utilisateur
     * par son numéro de plaque d'immatriculation.
     *
     * @param car       Les données de la voiture à sauvegarder.
     *     de plaque d'immatriculation de l'utilisateur auquel la voiture est associée.
     * @return Un objet CarDto correspondant à la voiture sauvegardée.
     * @throws ValidationException    Si les données de la voiture sont incomplètes.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public CarDto save(Car car) throws ValidationException, UserNotFoundException {
        log.debug("Saving car {}", car);
        logger.info("my car {}", car);
        if (car.getModel() == null ) {
            throw new ValidationException("Les données de la voiture sont incomplètes.");
        }
        return carMapper.toDto(carRepository.save(car));
    }

    /**
     * Cette méthode permet de mettre à jour les données d'une voiture par son numéro de plaque d'immatriculation.
     *
     * @param licensePlate Le numéro de plaque d'immatriculation de la voiture à mettre à jour.
     * @param carDto       Les nouvelles données de la voiture.
     * @return Un objet CarDto correspondant à la voiture mise à jour.
     * @throws CarNotFoundException Si la voiture n'est pas trouvée.
     */
    @Override
    public CarDto update(String licensePlate, CarDto carDto) throws CarNotFoundException, ModelNotFoundException {
        log.debug("Updating car {}", carDto);
        Car car = carRepository.findByLicensePlate(licensePlate).orElseThrow(CarNotFoundException::new);
        log.info("pictures in dto {}", carDto.pictures());
        log.info("pictures in car {}", car.getPictures());
        Car carUpdate = carMapper.partialUpdate(carDto, car);
        Model model = modelRepository.findByModelAndBrand(carDto.modelLabel(),brandRepository.findByName(carDto.brandLabel())).orElseThrow(ModelNotFoundException::new);
        carUpdate.setModel(model);
        return carMapper.toDto(carRepository.save(carUpdate));
    }

    @Override
    public String addImage(Long id, MultipartFile file) throws CarNotFoundException {
        String url = firebaseService.saveFile(file, "files");

        Optional<Car> optionalCar = carRepository.findById(id);

        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();

            Picture picture = new Picture();
            picture.setUrl(url);

            car.getPictures().add(picture);
             pictureRepository.save(picture);

            return "picture save";
        } else {
            // Handle the case where the car with the given id is not found
            throw new CarNotFoundException();
        }
    }


}



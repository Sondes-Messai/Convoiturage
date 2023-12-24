package com.afpa.kawaa.controller;

import com.afpa.kawaa.domain.Car;
import com.afpa.kawaa.domain.Model;
import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.CarDto;
import com.afpa.kawaa.dto.mapper.CarMapper;
import com.afpa.kawaa.dto.mapper.UserMapper;
import com.afpa.kawaa.exception.CarNotFoundException;
import com.afpa.kawaa.exception.ModelNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.exception.ValidationException;
import com.afpa.kawaa.repository.BrandRepository;
import com.afpa.kawaa.repository.ModelRepository;
import com.afpa.kawaa.service.UserService;
import com.afpa.kawaa.service.impl.CarServiceImpl;
import com.afpa.kawaa.exception.*;
import com.afpa.kawaa.service.impl.PictureServiceImpl;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/car")
@Slf4j
public class CarController {
    private final BrandRepository brandRepository;
    private final ModelRepository modelRepository;

    private final CarServiceImpl carService;
    private final UserService userService;
    private final UserMapper userMapper;
    private final CarMapper carMapper;
    private static final Logger logger = LoggerFactory.getLogger(CarController.class);

    private final PictureServiceImpl pictureService;


    /**
     * Cette méthode vérifie si la plaque d'immatriculation existe en base de donnée
     *
     * @return Cette méthode retourne true si la plaque d'immatriculation existe et false si il n'existe pas
     * @para matriculation le string licensePlate correspond à l'immatriculation de la voiture
     */
    @GetMapping("exist-matriculation/{licensePlate}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<Boolean> findByLicensePlate(@PathVariable(value = "licensePlate") String licensePlate) {
        log.debug("Exist {}", licensePlate);
        return ResponseEntity.ok(carService.existByLicensePlate(licensePlate));
    }


    /**
     * Cette méthode effectue l'enregistrement d'une voiture
     *
     * @return Cette méthode retourne la voiture enregistrée
     * @para carUserDto {Object} contient les informations de la voiture que l'utilisateur souhaite enregistrer,
     * tel que : ( la plque d'immatriculation, la couleur, le nombre de place disponnible, les bagages,
     * le model, la marque)
     */
    @PostMapping("/register")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<CarDto> register(@RequestBody @Valid CarDto carUserDto) throws ValidationException, UserNotFoundException {
        log.debug("Registering car {}", carUserDto);
        Car car = carMapper.toEntity(carUserDto);
        return ResponseEntity.ok(carService.save(car));
    }


    /**
     * Cette méthode sert a crée une voiture à l'utilisateur
     *
     * @param {String} s
     *                 Ici on récupère le token JWT de JwtTokenHolder de l'utilisateur, pout ensuite lui rajouter la voiture
     * @return Cette méthode retourne la voiture crée à l'utilisateur correspondant
     */
    @PostMapping("/create")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<CarDto> create(@RequestParam String email, @RequestBody @Valid CarDto carDto) throws UserNotFoundException, ValidationException, ModelNotFoundException {
        log.debug("Registering car {}", carDto);
        Car car = carMapper.toEntity(carDto);
        try {
            User user = userMapper.toEntity(userService.findByEmailOrMatricule(email));
            car.setUser(user);
        } catch (Exception e) {
            throw new UserNotFoundException("Utilisateur non trouvé ");
        }
        Model model = modelRepository.findByModelAndBrand(carDto.modelLabel(),brandRepository.findByName(carDto.brandLabel())).orElseThrow(ModelNotFoundException::new);
        car.setModel(model);
        return ResponseEntity.ok(carService.save(car));
    }


    /**
     * Cette méthode effectue la modification d'une voiture par sa plaque d'immatriculation
     *
     * @param {String} licensePlate
     * @param {Object} carUserDto  contient les informations de la voiture à modifier,
     *                 *                   tel que : ( la plaque d'immatriculation, la couleur,
     *                 *                   le model, la marque )
     * @return {String} Cette méthode retourne la voiture à jour modifié
     */
    @PutMapping("/update/{licensePlate}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<CarDto> updateByLicensePlate(@PathVariable String licensePlate, @RequestBody @Valid CarDto carUserDto) throws CarNotFoundException, ModelNotFoundException {
        log.debug("Updating intern {}", carUserDto);
        logger.info("CarUserDto {}", carUserDto);
        return ResponseEntity.ok(carService.update(licensePlate, carUserDto));
    }


    /**
     * Cette méthode effectue la suppresion d'une voiture de l'utilisateur
     *
     * @param {String} licensePlate
     * @return {Object} Cette méthode retourne les informations de la voiture supprimé
     */
    @DeleteMapping("/delete/{licensePlate}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<Boolean> deleteByLicensePlate(@PathVariable String licensePlate) throws CarNotFoundException {
        log.debug("Deleting car by licensePlate {}", licensePlate);
        return ResponseEntity.ok(carService.deleteByLicensePlate(licensePlate));
    }


    /**
     * Cette méthode recherche la voiture en fonction de sa plaque d'immatriculation
     *
     * @param {String} licensePlate
     * @return Cette méthode retourne la la voiture de l'utilisateur correspondant
     */
    @GetMapping("/get/{licensePlate}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<CarDto> getByLicensePLate(@PathVariable String licensePlate) throws CarNotFoundException {
        log.debug("Deleting car by matriculation {}", licensePlate);
        return ResponseEntity.ok(carService.findByLicensePlate(licensePlate));

    }

    /**
     * Cette méthode retourne toutes les voitures de l'utilisateur
     *
     * @param {String} mail
     *                 Ici on récupère le token JWT de JwtTokenHolder de l'utilisateur.
     * @return Cette méthode retourne la liste des voitures de l'utilisateur correspondant
     */
    @GetMapping("/car-user-mail/{mail}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<List<CarDto>> getAllByEmail(@PathVariable String mail) {
        return ResponseEntity.ok(carService.findAllByUserMail(mail));

    }

    @PostMapping("/addImage/{id}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<String> addImage(@PathVariable Long id, @RequestParam() MultipartFile file ) throws CarNotFoundException {
        logger.info("id : "+ id);
        return ResponseEntity.ok(carService.addImage(id, file));
    }

    @DeleteMapping("/deleteImage/{id}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) throws PictureNotFoundException {
        pictureService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}

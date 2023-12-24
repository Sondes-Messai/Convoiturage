package com.afpa.kawaa.controller;

import com.afpa.kawaa.domain.enume.StatusUser;
import com.afpa.kawaa.dto.*;
import com.afpa.kawaa.exception.PasswordNotMatchException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.repository.UserRepository;
import com.afpa.kawaa.service.PreferenceService;
import com.afpa.kawaa.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/user")
@Slf4j
public class UserController {
    private final UserRepository userRepository;
    private final PreferenceService userPreferenceService;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    /**
     * Cette méthode permet de récupérer tous les utilisateurs avec pagination.
     *
     * @param pageable Les informations de pagination.
     * @return ResponseEntity contenant une Page d'objets UserDto.
     */
    @GetMapping("/admin/all")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<Page<UserDto>> findAllWithPagination(@Nullable @Param("status") StatusUser status, Pageable pageable) {
        return ResponseEntity.ok(userService.findAll(status, pageable));
    }


    /**
     * Cette méthode permet de récupérer un utilisateur par son adresse e-mail.
     *
     * @param email L'adresse e-mail de l'utilisateur.
     * @return ResponseEntity contenant un objet UserDto.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @GetMapping("/email/{email}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<UserDto> byEmail(@PathVariable String email) throws UserNotFoundException {
        return ResponseEntity.ok(userService.findByEmailOrMatricule(email));
    }

    /**
     * Cette méthode permet de supprimer un utilisateur par son adresse e-mail ou son matricule.
     *
     * @param matricule Le matricule de l'utilisateur à supprimer.
     * @return ResponseEntity contenant un booléen indiquant le succès de la suppression.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @DeleteMapping("/delete/{matricule}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<UserDto> deleteByMatricule(@PathVariable String matricule) throws UserNotFoundException {
        log.debug("Suppression de l'utilisateur par adresse e-mail ou matricule {}", matricule);
        return ResponseEntity.ok(userService.deleteByMatricule(matricule));
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur par son matricule.
     *
     * @param matricule      L'identifiant matricule de l'utilisateur à mettre à jour.
     * @param userInfoUpdate Les données mises à jour de l'utilisateur.
     * @return ResponseEntity contenant un message de confirmation.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @PutMapping("/update/{matricule}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<String> updateByMatricule(@PathVariable String matricule, @RequestBody @Valid UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException {
        log.debug("Mise à jour de l'utilisateur {}", userInfoUpdate);
        logger.info("user info avant methode {}", userInfoUpdate);
        return ResponseEntity.ok(userService.updateUser2(matricule, userInfoUpdate));
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur par son matricule.
     *
     * @param file image de profil de l'utilisateur.
     * @param userInfoUpdateWithName Les données mises à jour de l'utilisateur.
     * @return ResponseEntity contenant un message de confirmation.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @PutMapping("/updatewithfile")
    public ResponseEntity<String> updateByMatriculeWithFile(
                                                            @RequestParam() MultipartFile file,
                                                            @ModelAttribute UserInfoUpdateWithName userInfoUpdateWithName) throws UserNotFoundException,IOException {
        log.debug("Mise à jour de l'utilisateur {}", userInfoUpdateWithName);
        logger.info("file info avant methode {}", file);
        logger.info("user info avant methode {}", userInfoUpdateWithName);
        return ResponseEntity.ok(userService.updateUserWithFile(userInfoUpdateWithName, file));
    }

    /**
     * Cette méthode permet de récupérer un utilisateur par son identifiant.
     *
     * @param id L'identifiant de l'utilisateur.
     * @return ResponseEntity contenant un objet UserDto.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @GetMapping("/id/{id}")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<UserDto> findById(@PathVariable Long id) throws UserNotFoundException {
        log.debug("Recherche de l'utilisateur par identifiant {}", id);
        return ResponseEntity.ok(userService.findById(id));
    }

    /**
     * Cette méthode permet de changer le mot de passe d'un utilisateur.
     *
     * @param changePassDto Les informations de changement de mot de passe.
     * @return ResponseEntity contenant un objet UserDto mis à jour.
     * @throws UserNotFoundException     Si l'utilisateur n'est pas trouvé.
     * @throws PasswordNotMatchException Si le mot de passe actuel ne correspond pas.
     */
    @PutMapping("/change-password")
    @RolesAllowed({"SUPER", "ADMIN", "USER"})
    public ResponseEntity<UserDto> changePassword(@RequestBody @Valid ChangePassDto changePassDto) throws UserNotFoundException, PasswordNotMatchException {
        return ResponseEntity.ok(userService.changePassword(changePassDto));
    }


    /**
     * Cette méthode permet à un administrateur de s'inscrire en tant qu'utilisateur.
     *
     * @param userDto Les données de l'utilisateur à inscrire.
     * @return ResponseEntity contenant un message de confirmation.
     */
    @PostMapping("/admin/register")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<String> adminRegister(@RequestBody UserDto userDto) {

        return ResponseEntity.ok(userService.adminRegister(userDto));
    }

    /**
     * Cette méthode permet de rechercher des utilisateurs par nom.
     *
     * @param search    Le nom à rechercher.
     * @param number    Le numéro de page.
     * @param size      La taille de la page.
     * @param direction La direction de tri (ASC ou DESC).
     * @param property  La propriété de tri.
     * @return ResponseEntity contenant une Page d'objets UserDto.
     */
    @GetMapping(value = "/admin/search")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<Page<UserDto>> search(@Nullable StatusUser status, String search, Integer number, Integer size, String direction, String property) {
        Sort.Direction sort = direction.equals("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable page = PageRequest.of(number, size, Sort.by(sort, property));
        return ResponseEntity.ok(userService.searchByName(status, search, page));
    }

    /**
     * Cette méthode permet de mettre à jour le mot de passe d'un utilisateur en tant qu'administrateur.
     *
     * @param changePassDto Les informations de changement de mot de passe.
     * @return ResponseEntity contenant un objet UserDto mis à jour.
     * @throws UserNotFoundException     Si l'utilisateur n'est pas trouvé.
     * @throws PasswordNotMatchException Si le mot de passe actuel ne correspond pas.
     */
    @PutMapping(value = "/admin/update-password")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<UserDto> updatePasswordOfUser(@RequestBody @Valid ChangePassDto changePassDto) throws UserNotFoundException, PasswordNotMatchException {
        return ResponseEntity.ok(userService.changePassword(changePassDto));
    }

    @PutMapping(value = "/admin/block/{matricule}")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<UserDto> blockUser(@PathVariable String matricule) throws UserNotFoundException {
        return ResponseEntity.ok(userService.blockUser(matricule));
    }

    @PutMapping(value = "/admin/unblock/{matricule}")
    @RolesAllowed({"SUPER", "ADMIN"})
    public ResponseEntity<UserDto> unblockUser(@PathVariable String matricule) throws UserNotFoundException {
        return ResponseEntity.ok(userService.unblockUser(matricule));
    }

    @GetMapping(value="/stat/date")
    public List<Object[]> getUsersByCreationDate() {
     return userService.countUsersByCreationDate();
    }

    @GetMapping(value="/stat/nb")
    public Integer getNbActifsUsers() {
        return userService.nbActifsUsers();
    }
}


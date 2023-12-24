package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.*;
import com.afpa.kawaa.domain.enume.StatusUser;
import com.afpa.kawaa.dto.*;
import com.afpa.kawaa.dto.mapper.SiteMapper;
import com.afpa.kawaa.dto.UserInfoUpdate;
import com.afpa.kawaa.dto.UserInfoUpdateWithName;
import com.afpa.kawaa.repository.PictureRepository;
import com.afpa.kawaa.security.auth.JwtService;
import com.afpa.kawaa.constants.DebugConstant;
import com.afpa.kawaa.dto.mapper.PreferenceMapper;
import com.afpa.kawaa.dto.mapper.UserMapper;
import com.afpa.kawaa.exception.PasswordNotMatchException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.repository.PreferenceRepository;
import com.afpa.kawaa.repository.UserRepository;
import com.afpa.kawaa.service.FirebaseService;
import com.afpa.kawaa.service.PreferenceService;
import com.afpa.kawaa.service.SiteService;
import com.afpa.kawaa.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {
    private final PictureRepository pictureRepository;


    private final UserMapper userMapper;

    private final PreferenceMapper preferenceMapper;

    private final PasswordEncoder passwordEncoder;

    private final PreferenceService preferenceService;

    private final SiteService siteService;
    private final SiteMapper siteMapper;

    private final UserRepository userRepository;

    private final PreferenceRepository preferenceRepository;

    private final JwtService jwtService;

    private final FirebaseService firebaseService;


    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);


    /**
     * Cette méthode permet de trouver un utilisateur par son adresse e-mail ou son matricule.
     *
     * @param emailOrMatricule L'adresse e-mail ou le matricule de l'utilisateur.
     * @return Un objet UserDto correspondant à l'utilisateur trouvé.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDto findByEmailOrMatricule(String emailOrMatricule) throws UserNotFoundException {
        log.debug("Recherche de l'identifiant par adresse e-mail ou matricule {}", emailOrMatricule);
        User user = userRepository.findByMatriculeOrMail(emailOrMatricule, emailOrMatricule).orElseThrow(UserNotFoundException::new);
        logger.info("find by mail or matricule user : "+ user );
        UserDto userDto = userMapper.toDto(user) ;
        logger.info("mapper  : " + userDto );
        return userDto;
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur par son matricule.
     *
     * @param matricule      L'identifiant matricule de l'utilisateur à mettre à jour.
     * @param userInfoUpdate Les données de l'utilisateur à mettre à jour.
     * @return Un objet UserDto correspondant à l'utilisateur mis à jour.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDto update(String matricule, UserInfoUpdate userInfoUpdate) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdate);
        User user = userRepository.findByMatricule(matricule).orElseThrow(UserNotFoundException::new);
        user = userMapper.toUserUpdate(userInfoUpdate, user);
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDto updateByMailOrMatricule(String emailOrMatricule, UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdate);
        User user = userRepository.findByMatriculeOrMail(emailOrMatricule, emailOrMatricule).orElseThrow(UserNotFoundException::new);
        user = userMapper.toUserUpdateWithName(userInfoUpdate, user);
        return userMapper.toDto(userRepository.save(user));
    }

    /**
     * Cette méthode permet de mettre à jour le token d'un utilisateur.
     *
     * @param emailOrMatricule L'adresse e-mail ou le matricule de l'utilisateur.
     * @param userInfoUpdate   Les données de l'utilisateur à mettre à jour.
     * @return Un token généré pour l'utilisateur mis à jour.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public String updateToken(String emailOrMatricule, UserInfoUpdate userInfoUpdate) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdate);
        User user = userRepository.findByMatriculeOrMail(emailOrMatricule, emailOrMatricule).orElseThrow(UserNotFoundException::new);
        user = userMapper.toUserUpdate(userInfoUpdate, user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur.
     *
     * @param userInfoUpdate Les données de l'utilisateur à mettre à jour.
     * @return Un message de confirmation indiquant que l'utilisateur a été correctement enregistré.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public String updateUser(UserInfoUpdate userInfoUpdate) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdate);
        User user = userRepository.findByMatricule(userInfoUpdate.matricule()).orElseThrow(UserNotFoundException::new);
        user = userMapper.toUserUpdate(userInfoUpdate, user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Utilisateur correctement enregistré";
    }

    /**
     * Cette méthode permet de mettre à jour un utilisateur.
     *
     * @param userInfoUpdate Les données de l'utilisateur à mettre à jour.
     * @return Un message de confirmation indiquant que l'utilisateur a été correctement enregistré.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public String updateUser2(String matricule, UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdate);
        User user = settingUser(userInfoUpdate);
        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    @Override
    public String updateUserWithFile(UserInfoUpdateWithName userInfoUpdateWithName, MultipartFile file) throws UserNotFoundException {
        log.debug(DebugConstant.UPDATING_USER, userInfoUpdateWithName.matricule());
        logger.info("matricule info " + userInfoUpdateWithName.matricule());
        User user = userRepository.findByMatricule(userInfoUpdateWithName.matricule()).orElseThrow(UserNotFoundException::new);
        String url = firebaseService.saveFile(file, "profile");
        user.getPicture().setUrl(url);
        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    private User settingUser(UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException {
        logger.info("settinguser info " + userInfoUpdate);
        User user = userRepository.findByMatricule(userInfoUpdate.matricule()).orElseThrow(UserNotFoundException::new);
        logger.info("user " + user);
        String EnncodedPassword = user.getPassword();
        user = userMapper.toUserUpdateWithName(userInfoUpdate, user);
        logger.info("MAP: {}", user);
        if (userInfoUpdate.password() != null && !userInfoUpdate.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userInfoUpdate.password()));
        } else {
            user.setPassword(EnncodedPassword);
        }
        Site site = siteService.findByName(userInfoUpdate.workSite());
        user.setSite(site);
        return user;
    }


    /**
     * Cette méthode permet de trouver un utilisateur par son identifiant.
     *
     * @param id L'identifiant de l'utilisateur.
     * @return Un objet UserDto correspondant à l'utilisateur trouvé.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDto findById(Long id) throws UserNotFoundException {
        log.debug("Recherche de l'utilisateur par identifiant {}", id);
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userMapper::toDto).orElseThrow(UserNotFoundException::new);
    }

    /**
     * Cette méthode permet de récupérer les informations d'un utilisateur par son identifiant.
     *
     * @param id L'identifiant de l'utilisateur.
     * @return Un objet UserDto correspondant aux informations de l'utilisateur.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDto getUserInfosById(Long id) throws UserNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(userMapper::toDto).orElseThrow(UserNotFoundException::new);
    }

    /**
     * Cette méthode permet d'enregistrer un nouvel utilisateur.
     *
     * @param userDto Les données de l'utilisateur à enregistrer.
     * @return Un objet User correspondant à l'utilisateur enregistré.
     */
    @Override
    public User save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        Role role = new Role();
        role.setLabel("ROLE_USER");
        user.setRole(role);
        //ICI pas de gestion donc actif, si la gestion de mail est faite changer Status en INACTIF et une fois le mail valider passer Status en ACTIF
        user.setStatus(StatusUser.ACTIF);

        Site site = siteService.findByName(userDto.workSite());
        user.setSite(site);

        if (userDto.preferenceLabels() != null) {
            Set<Preference> preferences = preferenceService.findAllByLabelIn(userDto.preferenceLabels());
            user.setPreferences(preferences);
        }

        return userRepository.save(user);
    }

    /**
     * Cette méthode permet de supprimer un utilisateur par son adresse e-mail ou son matricule.
     *
     * @param mailMatricule L'adresse e-mail ou le matricule de l'utilisateur à supprimer.
     * @return Un booléen indiquant le succès de la suppression.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public UserDto deleteByMatricule(String mailMatricule) throws UserNotFoundException {
        log.debug("Suppression de l'utilisateur par adresse e-mail ou matricule {}", mailMatricule);
        User user = userRepository.findByMatricule(mailMatricule).orElseThrow(UserNotFoundException::new);
        user.setStatus(StatusUser.ARCHIVED);
        return userMapper.toDto(userRepository.save(user));
    }

    /**
     * Cette méthode permet de récupérer tous les utilisateurs avec pagination et éventuellement en fonction de leur statut.
     *
     * @param pageable Les informations de pagination.
     * @param status   Le statut optionnel pour filtrer les utilisateurs (actif, inactif, etc.).
     * @return Une Page d'objets UserDto.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserDto> findAll(@Nullable @Param("status") StatusUser status, Pageable pageable) {
        if (status != null) {
            return userRepository.findByStatus(status, pageable).map(userMapper::toDto);
        } else {
            return userRepository.findAll(pageable).map(userMapper::toDto);
        }
    }


    /**
     * Cette méthode permet de vérifier si un utilisateur existe déjà en fonction de son adresse e-mail.
     *
     * @param email L'adresse e-mail de l'utilisateur.
     * @return true si un utilisateur avec l'adresse e-mail existe, sinon false.
     */
    @Override
    public Boolean existByEmail(String email) {
        Optional<User> user = userRepository.findByMail(email);
        return user.isPresent();
    }

    /**
     * Cette méthode permet à un administrateur de s'inscrire en tant qu'utilisateur.
     *
     * @param userDto Les données de l'utilisateur à enregistrer.
     * @return Un mot de passe aléatoire généré pour l'administrateur enregistré.
     */
    @Override
    public String adminRegister(UserDto userDto) {
        log.debug("Enregistrement de l'utilisateur administrateur {}", userDto);
        String workSite = userDto.workSite();
        User user = userMapper.toEntity(userDto);
        String randomPassword = RandomStringUtils.random(12, true, true);
        String encodedPassword = passwordEncoder.encode(randomPassword);
        user.setPassword(encodedPassword);
        Role role = new Role();
        role.setLabel("ROLE_USER");
        user.setRole(role);
        user.setToken(jwtService.generateToken(user));
        Site site = siteService.findByName(workSite);
        user.setSite(site);
        userRepository.save(user);

        return randomPassword;
    }

    /**
     * Cette méthode permet de changer le mot de passe d'un utilisateur.
     *
     * @param changePassDto Les informations de changement de mot de passe.
     * @return Un objet UserDto correspondant à l'utilisateur mis à jour.
     * @throws UserNotFoundException     Si l'utilisateur n'est pas trouvé.
     * @throws PasswordNotMatchException Si le mot de passe actuel ne correspond pas.
     */
    @Override
    public UserDto changePassword(ChangePassDto changePassDto) throws UserNotFoundException, PasswordNotMatchException {
        logger.info("changePassDto : ", changePassDto);
        User user = userRepository.findByMatriculeOrMail(changePassDto.matricule(), changePassDto.matricule()).orElseThrow(UserNotFoundException::new);
        if (passwordEncoder.matches(changePassDto.oldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePassDto.newPassword()));
            return userMapper.toDto(userRepository.save(user));
        } else {
            throw new PasswordNotMatchException();
        }
    }

    /**
     * Cette méthode permet de récupérer les préférences d'un utilisateur par son adresse e-mail ou son matricule.
     *
     * @param s L'adresse e-mail ou le matricule de l'utilisateur.
     * @return Un ensemble (Set) d'objets PreferenceDto correspondant aux préférences de l'utilisateur.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    public Set<PreferenceDto> getUserPreferenceByEmailOrMatricule(String s) throws UserNotFoundException {
        User user = userRepository.findByMatriculeOrMail(s, s).orElseThrow(UserNotFoundException::new);
        return user.getPreferences().stream().map(preferenceMapper::toDto).collect(Collectors.toSet());
    }


    /**
     * Cette méthode permet de rechercher des utilisateurs par nom, avec la possibilité de filtrer par statut
     * et de trier par statut.
     *
     * @param search Le nom à rechercher.
     * @param page   Les informations de pagination.
     * @param status Le statut à filtrer (paramètre optionnel).
     * @return Une Page d'objets UserDto correspondant aux utilisateurs trouvés.
     */
    @Override
    public Page<UserDto> searchByName(@Nullable StatusUser status, String search, Pageable page) {

        if (status != null) {
            Page<User> user = userRepository.getAllByNameAndStatus("%" + search + "%", status, page);
            return user.map(userMapper::toDto);
        } else {
            Page<User> user = userRepository.getAllByName("%" + search + "%", page);
            return user.map(userMapper::toDto);
        }
    }

    /**
     * Cette méthode permet de mettre à jour les préférences d'un utilisateur.
     *
     * @param s              L'identifiant de l'utilisateur.
     * @param preferenceDtos L'ensemble des préférences à mettre à jour.
     * @return Un ensemble (Set) d'objets PreferenceDto mis à jour.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public Set<PreferenceDto> updateUserPreferences(String s, Set<PreferenceDto> preferenceDtos) throws UserNotFoundException {
        User user = userRepository.findByMatriculeOrMail(s, s).orElseThrow(UserNotFoundException::new);
        Set<Preference> preferences = preferenceDtos.stream().map(preferenceDto -> preferenceRepository.findByLabel(preferenceDto.label())).collect(Collectors.toSet());
        user.setPreferences(preferences);
        userRepository.save(user);
        return user.getPreferences().stream().map(preferenceMapper::toDto).collect(Collectors.toSet());
    }

    /**
     * Cette méthode permet de bloquer un utilisateur
     *
     * @param matricule matricule de l'utilisateur à bloquer
     * @return
     * @throws UserNotFoundException erreur si aucun utilisateur ne correspond à ce matricule
     */
    @Override
    public UserDto blockUser(String matricule) throws UserNotFoundException {
        User user = userRepository.findByMatricule(matricule).orElseThrow(UserNotFoundException::new);
        user.setStatus(StatusUser.BLOCKED);
        return userMapper.toDto(userRepository.save(user));
    }

    /**
     * Cette méthode permet de débloquer un utilisateur
     *
     * @param matricule matricule de l'utilisateur à débloquer
     * @return
     * @throws UserNotFoundException erreur si aucun utilisateur ne correspond à ce matricule
     */
    @Override
    public UserDto unblockUser(String matricule) throws UserNotFoundException {
        User user = userRepository.findByMatricule(matricule).orElseThrow(UserNotFoundException::new);
        user.setStatus(StatusUser.ACTIF);
        return userMapper.toDto(userRepository.save(user));
    }

    public List<Object[]> countUsersByCreationDate() {
        return userRepository.countUsersByCreationDate();
    }

    public Integer nbActifsUsers() {
        return userRepository.nbActifsUsers();
    }
}

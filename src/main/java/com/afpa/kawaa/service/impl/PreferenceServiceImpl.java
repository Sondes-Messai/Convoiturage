package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.*;
import com.afpa.kawaa.dto.PreferenceDto;
import com.afpa.kawaa.dto.mapper.PreferenceMapper;
import com.afpa.kawaa.dto.mapper.UserMapper;
import com.afpa.kawaa.exception.PreferenceNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import com.afpa.kawaa.repository.PictureRepository;
import com.afpa.kawaa.repository.PreferenceRepository;
import com.afpa.kawaa.repository.UserRepository;
import com.afpa.kawaa.service.FirebaseService;
import com.afpa.kawaa.service.PreferenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class PreferenceServiceImpl implements PreferenceService {
    private final PictureRepository pictureRepository;

    private final PreferenceRepository preferenceRepository;

    private final UserRepository userRepository;

    private final PreferenceMapper preferenceMapper;

    private final UserMapper userMapper;

    private final FirebaseService firebaseService;


    /**
     * Cette méthode permet de trouver toutes les préférences ayant des libellés spécifiés.
     *
     * @param labels Un ensemble (Set) de libellés à rechercher.
     * @return Un ensemble (Set) d'objets Preference correspondant aux préférences trouvées.
     */
    @Override
    public Set<Preference> findAllByLabelIn(Set<String> labels) {
        log.debug("Recherche des préférences par libellé {}", labels);
        return preferenceRepository.findAllByLabelIn(labels);
    }

    /**
     * Cette méthode permet d'ajouter une nouvelle préférence à la liste des préférences.
     *
     * @param preferenceDto Les données de la nouvelle préférence.
     * @return une nouvelle préférence enregistrée.
     */


    @Override
    public Preference save(PreferenceDto preferenceDto, MultipartFile file) {
        Picture picture = new Picture();
        String url = firebaseService.saveFile(file, "files");
        picture.setUrl(url);
        pictureRepository.save(picture);
        Preference preference = preferenceMapper.toEntity(preferenceDto);
        preference.setPicture(picture);
        preference.setIsArchived(false);
        preference.setIsVisible(true);
        return preferenceRepository.save(preference);
    }

    @Override
    public String archiveChanged(String label) throws PreferenceNotFoundException  {
        Preference preference = preferenceRepository.findById(label).orElseThrow(PreferenceNotFoundException::new);
        preference.setIsArchived(!preference.getIsArchived());
        preferenceRepository.save(preference);
        return "préférence status changé";
    }

    @Override
    public String visibilityChanged(String label) throws PreferenceNotFoundException  {
        Preference preference = preferenceRepository.findById(label).orElseThrow(PreferenceNotFoundException::new);
        preference.setIsVisible(!preference.getIsVisible());
        preferenceRepository.save(preference);
        return "préférence visibilité changée";
    }

    /**
     * Cette méthode permet de récupérer toutes les préférences sous forme de DTO (Data Transfer Object).
     *
     * @return Un ensemble (Set) d'objets PreferenceDto correspondant à toutes les préférences.
     */
    @Override
    public Set<PreferenceDto> getAll() {
        return preferenceRepository.findAll().stream().map(preferenceMapper::toDto).collect(Collectors.toSet());
    }

    /**
     * Cette méthode permet de mettre à jour les préférences d'un utilisateur.
     *
     * @param s             L'identifiant de l'utilisateur.
     * @param preferenceDtos L'ensemble des préférences à mettre à jour.
     * @return Un ensemble (Set) d'objets PreferenceDto mis à jour.
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé.
     */
    @Override
    public Set<PreferenceDto> updateUserPreferences(String s, Set<PreferenceDto> preferenceDtos) throws UserNotFoundException {
        User user = userRepository.findByMatriculeOrMail(s, s).orElseThrow(UserNotFoundException::new);
        user.setPreferences(preferenceDtos.stream().map(p -> preferenceRepository.findByLabel(p.label())).collect(Collectors.toSet()));
        userRepository.save(user);
        return user.getPreferences().stream().map(preferenceMapper::toDto).collect(Collectors.toSet());
    }

    public String updatePreferenceIcon(String label, MultipartFile file) throws PreferenceNotFoundException {
        Picture picture = new Picture();
        String url = firebaseService.saveFile(file, "files");
        picture.setUrl(url);
        pictureRepository.save(picture);
        Preference preference = preferenceRepository.findById(label).orElseThrow(PreferenceNotFoundException::new);
        preference.setPicture(picture);
        return "icone changée";
    }

    @Override
    public Boolean existByLabel(String label) {
        Optional<Preference> preference = preferenceRepository.findById(label);
        return preference.isPresent();
    }
}

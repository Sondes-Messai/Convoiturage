package com.afpa.kawaa.service;


import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.dto.PreferenceDto;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.exception.PreferenceNotFoundException;
import com.afpa.kawaa.exception.SiteNotFoundException;
import com.afpa.kawaa.exception.UserNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public interface PreferenceService {

    Set<Preference> findAllByLabelIn(Set<String> labels);

    Set<PreferenceDto> getAll();

    Preference save(PreferenceDto preferenceDto, MultipartFile file);

    String updatePreferenceIcon(String label, MultipartFile file) throws PreferenceNotFoundException;

    String archiveChanged(String label) throws PreferenceNotFoundException;

    String visibilityChanged(String label) throws PreferenceNotFoundException;

    Set<PreferenceDto> updateUserPreferences(String s, Set<PreferenceDto> preferenceDtos) throws UserNotFoundException;

    Boolean existByLabel(String label)throws PreferenceNotFoundException;


}

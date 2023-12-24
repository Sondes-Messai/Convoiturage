package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.ChangePassDto;
import com.afpa.kawaa.dto.PreferenceDto;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.dto.UserInfoUpdate;
import com.afpa.kawaa.domain.enume.StatusUser;
import com.afpa.kawaa.dto.*;
import com.afpa.kawaa.exception.PasswordNotMatchException;
import com.afpa.kawaa.exception.UserNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;

public interface UserService {

    UserDto update(String matricule, UserInfoUpdate userInfoUpdate) throws UserNotFoundException;

    UserDto updateByMailOrMatricule(String emailOrMatricule, UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException;

    String updateToken(String matricule, UserInfoUpdate userInfoUpdate) throws UserNotFoundException;

    String updateUser(UserInfoUpdate userInfoUpdate) throws UserNotFoundException;

    String updateUser2(String matricule,UserInfoUpdateWithName userInfoUpdate) throws UserNotFoundException;

    String updateUserWithFile(UserInfoUpdateWithName userInfoUpdateWithName, MultipartFile file) throws UserNotFoundException;


    UserDto findById(Long id) throws UserNotFoundException;

    UserDto getUserInfosById(Long id) throws UserNotFoundException;

    User save(UserDto userDto);

    UserDto deleteByMatricule(String mailMatricule) throws UserNotFoundException;

    Page<UserDto> findAll(@Nullable StatusUser status, Pageable pageable);

    UserDto findByEmailOrMatricule(String s ) throws UserNotFoundException;

    Boolean existByEmail(String email) throws UserNotFoundException;

    UserDto changePassword(ChangePassDto changePassDto) throws UserNotFoundException, PasswordNotMatchException;

    Set<PreferenceDto> getUserPreferenceByEmailOrMatricule(String s) throws UserNotFoundException;

    String adminRegister(UserDto userDto);

    Page<UserDto> searchByName(@Nullable StatusUser status,String search, Pageable page);
    Set<PreferenceDto> updateUserPreferences(String s , Set<PreferenceDto> preferenceDtos) throws UserNotFoundException;

    UserDto blockUser(String matricule) throws UserNotFoundException;
    UserDto unblockUser(String matricule) throws UserNotFoundException;

    List<Object[]> countUsersByCreationDate();

    Integer nbActifsUsers();
}

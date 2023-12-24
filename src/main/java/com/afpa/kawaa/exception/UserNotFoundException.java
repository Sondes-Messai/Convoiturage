package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class UserNotFoundException  extends Exception {

    public UserNotFoundException() {
        super(ExceptionConstant.USER_NOT_FOUND);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(String utilisateurNonTrouvé) {
    }
}

package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class PreferenceNotFoundException extends Throwable {
    public PreferenceNotFoundException() {
        super(ExceptionConstant.PREFERENCE_NOT_FOUND);
    }
    public PreferenceNotFoundException(String preferenceNonTrouvé) {
    }
}
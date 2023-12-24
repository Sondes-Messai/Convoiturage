package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class SiteNotFoundException extends Throwable {
    public SiteNotFoundException() {
        super(ExceptionConstant.SITE_NOT_FOUND);
    }
    public SiteNotFoundException(String utilisateurNonTrouvé) {
    }
}

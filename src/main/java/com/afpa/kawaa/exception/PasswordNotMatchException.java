package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class PasswordNotMatchException extends Exception{
    public PasswordNotMatchException() {
        super(ExceptionConstant.PASSWORD_NOT_MATCH);
    }

}

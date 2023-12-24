package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class ContactUsFormNotFoundException extends Exception {
    public ContactUsFormNotFoundException() { super(ExceptionConstant.CONTACTUSFORM_NOT_FOUND); }
}

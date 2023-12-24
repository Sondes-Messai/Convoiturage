package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class AddressNotFoundException extends Exception {

    public AddressNotFoundException() {
        super(ExceptionConstant.ADDRESS_NOT_FOUND);
    }
}

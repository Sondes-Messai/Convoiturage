package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class RideNotFoundException extends Exception {

    public RideNotFoundException() {
        super(ExceptionConstant.RIDE_NOT_FOUND);
    }
}

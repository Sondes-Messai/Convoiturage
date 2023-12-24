package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class CarNotFoundException extends Exception{

    public CarNotFoundException() {
        super(ExceptionConstant.CAR_NOT_FOUND);
    }
}

package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class ModelNotFoundException extends Exception{
    public ModelNotFoundException() {
        super(ExceptionConstant.MODEL_NOT_FOUND);
    }
}

package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class PictureNotFoundException extends Exception{

    public PictureNotFoundException() {
        super(ExceptionConstant.PICTURE_NOT_FOUND);
    }
}

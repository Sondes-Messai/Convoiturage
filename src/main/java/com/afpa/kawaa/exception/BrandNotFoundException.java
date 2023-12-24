package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class BrandNotFoundException extends Exception{
    public BrandNotFoundException() {
        super(ExceptionConstant.BRAND_NOT_FOUND);
    }
}

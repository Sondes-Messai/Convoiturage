package com.afpa.kawaa.service;

import com.afpa.kawaa.exception.PictureNotFoundException;

public interface PictureService {
    void deleteById(Long id) throws PictureNotFoundException;
}

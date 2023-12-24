package com.afpa.kawaa.controller;

import com.afpa.kawaa.dto.RideDto;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Coordinates}
 */
@Value
public class CoordinateDto implements Serializable {
    RideDto ride;
}
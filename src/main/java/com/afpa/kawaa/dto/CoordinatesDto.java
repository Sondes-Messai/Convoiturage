package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.Ride;

import java.io.Serializable;

public record CoordinatesDto(Double longitude, Double latitude, Ride ride) implements Serializable {
}

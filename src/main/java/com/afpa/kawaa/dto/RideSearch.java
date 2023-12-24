package com.afpa.kawaa.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.afpa.kawaa.domain.Ride}
 */
public record RideSearch(String depart, String arrival, @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)LocalDateTime departDate) implements Serializable {
}
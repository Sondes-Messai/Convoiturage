package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for {@link com.afpa.kawaa.domain.Car}
 */
public record CarDto(Long id,
                     String brandLabel,
                     String modelLabel,
                     @Pattern(message = "Format de plaque d'immatriculation invalide. Le format attendu est AB-123-CD", regexp = "^[A-Z]{2}-\\d{3}-[A-Z]{2}$")
                     @NotBlank String licensePlate,
                     Color color,
                     Integer placeNumber,
                     Boolean luggage,
                     Set<PictureDto> pictures,
                     Long userId) implements Serializable {
}


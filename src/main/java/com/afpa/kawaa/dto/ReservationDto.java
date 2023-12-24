package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.afpa.kawaa.domain.Reservation}
 */
public record ReservationDto(
    Long id, // L'identifiant de la réservation
    Long rideId, // L'identifiant de la course
    String status, // Le statut de la réservation
    LocalDateTime createdDate, // La date et l'heure de création de la réservation
    LocalDateTime lastModifiedDate, // La date et l heure de la dernière modification de la réservation
    Long applicantId, // L'identifiant de l'utilisateur qui a demandé la réservation
    Long userId // L'identifiant de l'utilisateur qui a créé la réservation
)implements Serializable {
}

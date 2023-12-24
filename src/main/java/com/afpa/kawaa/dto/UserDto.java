package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.*;
import com.afpa.kawaa.domain.enume.StatusUser;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for {@link com.afpa.kawaa.domain.User}
 */

public record UserDto(Long id, Set<String> preferenceLabels, Role role, Set<CarDto> cars, Set<ConversationDto> conversations,
                      //Set<Message> messages, Set<Ride> rides, Set<Reservation> reservations, Site site,
                      @Size(min = 2, max = 50) @Pattern(message = "Le nom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$") String firstName,
                      @Size(min = 2, max = 50) @Pattern(message = "Le prenom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$") String lastName,
                      @Size(min = 10) @Pattern(message = "doit etre au format +33 1 05 32 78 96 ou 06 50 42 33 21 ou 0650423698 ou 06.50.42.69.87", regexp = "^(?:(?:\\+33|0)[1-9](?:[\\s.-]?[0-9]{2}){4})$") String phone,
                      String matricule, @Email @NotBlank String mail, String token, String workSite,
                      @Size(min = 2, max = 50) @Pattern(message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial avec un minimum de 8 caractéres et 254 au maximum", regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]+$") @NotBlank String password,
                      @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING) LocalDateTime createdDate,
                      StatusUser status,
                      Picture picture)

 implements Serializable {
}
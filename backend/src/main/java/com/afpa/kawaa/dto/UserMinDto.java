package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.Picture;
import com.afpa.kawaa.domain.enume.StatusUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.User}
 */
@Value
public class UserMinDto implements Serializable {
    @Size(min = 2, max = 50)
    @Pattern(message = "Le nom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$")
    String firstName;
    @Size(min = 2, max = 50)
    @Pattern(message = "Le prenom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$")
    String lastName;
    @Size(min = 10)
    @Pattern(message = "doit etre au format +33 1 05 32 78 96 ou 06 50 42 33 21 ou 0650423698 ou 06.50.42.69.87", regexp = "^(?:(?:\\+33|0)[1-9](?:[\\s.-]?[0-9]{2}){4})$")
    String phone;
    @NotBlank
    String matricule;
    @Email
    @NotBlank
    String mail;
    StatusUser status;
    Picture picture;
}
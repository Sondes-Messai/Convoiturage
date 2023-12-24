package com.afpa.kawaa.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.User}
 */
public record UserInfoUpdateWithName(
        @Size(min = 10) @Pattern(message = "doit etre au format +33 1 05 32 78 96 ou 06 50 42 33 21 ou 0650423698 ou 06.50.42.69.87", regexp = "^(?:(?:\\+33|0)[1-9](?:[\\s.-]?[0-9]{2}){4})$") String phone,
        @NotBlank String firstName, @NotBlank String lastName, @NotBlank String matricule, @Email @NotBlank String mail, String workSite, String password) implements Serializable {
}
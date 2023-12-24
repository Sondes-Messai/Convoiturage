package com.afpa.kawaa.security.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


public record RegisterRequest (

        @Size(min = 2, max = 50) @Pattern(message = "Le nom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$") String firstName,
        @Size(min = 2, max = 50) @Pattern(message = "Le prenom ne doit contenir au moins 2 character et valide", regexp = "^[a-zA-Z\u00C0-\u00FF\\u00C0-\\u017F\\s-]+$") String lastName,
        @Email @NotBlank String mail,
        @Size(min = 2, max = 50) @Pattern(message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial avec un minimum de 8 caractéres et 254 au maximum", regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]+$") @NotBlank String password,

        String roleLabel){
}

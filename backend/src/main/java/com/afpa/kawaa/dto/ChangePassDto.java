package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ChangePassDto (
        @Pattern(message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial avec un minimum de 8 caractéres et 254 au maximum", regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]+$") @NotBlank String oldPassword,
        @Pattern(message = "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial avec un minimum de 8 caractéres et 254 au maximum", regexp = "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]+$") @NotBlank String newPassword,
    String matricule
    ){
}

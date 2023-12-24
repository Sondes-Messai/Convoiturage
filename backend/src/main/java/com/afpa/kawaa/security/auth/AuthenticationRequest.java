package com.afpa.kawaa.security.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



public record AuthenticationRequest(

        @Email @NotBlank String email,
    String password,
    boolean rememberMe){
}
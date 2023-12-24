package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Brand}
 */
public record BrandDto(@NotBlank(message = "name is required") String name) implements Serializable {
}
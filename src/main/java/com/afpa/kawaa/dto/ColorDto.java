package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.Color;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public record ColorDto(@NotBlank(message = "color is required")Color color) implements Serializable {
}

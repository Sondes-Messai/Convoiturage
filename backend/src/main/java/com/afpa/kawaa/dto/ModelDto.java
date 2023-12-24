package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.Model;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

/**
 * DTO for {@link Model}
 */
public record ModelDto(String brandName,
                       @NotBlank(message = "label is required") String model) implements Serializable {
}
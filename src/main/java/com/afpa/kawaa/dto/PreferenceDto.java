package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Preference}
 */
public record PreferenceDto(@Size(min = 2, max = 50) @NotBlank String label,
                            String pictureUrl, Boolean isArchived, Boolean isVisible) implements Serializable {
}
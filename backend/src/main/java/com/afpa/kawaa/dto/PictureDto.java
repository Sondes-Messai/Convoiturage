package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Picture}
 */

public record PictureDto(@NotNull Long id, @NotBlank String url) implements Serializable {
}
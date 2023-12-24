package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.afpa.kawaa.domain.Message}
 */

public record MessagePostDto(Long conversationId, @Size(min = 1, max = 254) @NotBlank String content, String fileUrl,
                             LocalDateTime createdDate, Long userId, String userMatricule) implements Serializable {

}
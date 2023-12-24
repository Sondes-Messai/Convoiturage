package com.afpa.kawaa.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * DTO for {@link com.afpa.kawaa.domain.Conversation}
 */
@Value
public class ConversationDto implements Serializable {
    Long id;
    Set<UserMinDto> participants;
    LocalDateTime createdDate;
    @NotBlank
    String name;
    Boolean archived;
}
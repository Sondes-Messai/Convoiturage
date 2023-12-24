package com.afpa.kawaa.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;


public record ContactUsFormDto(Long id,
                               String email,
                               String name,
                               String firstName,
                               String help,
                               String about,
                               @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING) LocalDateTime createdDate,
                               String fileUrl,
                               Boolean status
) implements Serializable {
}

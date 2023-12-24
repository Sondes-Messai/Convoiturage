package com.afpa.kawaa.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ContactUsResponseDto {
    private String date;
    private String content;
    private String subject;
}

package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.enume.MessageType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {

    private MessageType type;
    private String content;
    private String fileUrl;
    private String sender;
    private String receiver;
    private String date;

}
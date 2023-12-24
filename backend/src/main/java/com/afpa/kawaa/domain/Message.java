package com.afpa.kawaa.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "message")
public class Message implements Serializable {

    @Serial
    private static final long serialVersionUID = -7094663237705157071L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "message_generator")
    @SequenceGenerator(name="message_generator", sequenceName = "message_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @Column(name = "content")
    @Size(max = 254)
    private String content;


    @Column(name = "file", length = 2550)
    private String fileUrl;

    @Column(name = "created_date")
    @NotNull
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdDate;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}

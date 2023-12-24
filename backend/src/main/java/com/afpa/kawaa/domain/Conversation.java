package com.afpa.kawaa.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "conversation")
public class Conversation implements Serializable {

    @Serial
    private static final long serialVersionUID = 8532291260162975862L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conversation_generator")
    @SequenceGenerator(name="conversation_generator", sequenceName = "conversation_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude
    @JsonIgnoreProperties("conversation")
    @OneToMany(mappedBy = "conversation", orphanRemoval = true)
    private Set<Message> messages = new LinkedHashSet<>();


    @ToString.Exclude
    @JsonIgnoreProperties("conversations")
    @ManyToMany
    @JoinTable(
            name = "account_conversations",
            joinColumns = @JoinColumn(name = "conversations_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants = new LinkedHashSet<>();

    @Column(name = "created_date")
    @NotBlank
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdDate;

    @Column(name = "name")
    @NotBlank
    private String name;


    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean archived;

}

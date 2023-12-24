package com.afpa.kawaa.domain;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "preference")
public class Preference implements Serializable {

    @Serial
    private static final long serialVersionUID = -1040614648091650960L;

    @Id
    @NotBlank
    @Size(min = 2, max=50)
    private String label;

    @ToString.Exclude
    @OneToOne(orphanRemoval = true)
    private Picture picture;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_archived", columnDefinition = "boolean default false")
    private Boolean isArchived;

    @Column(name = "is_visible", columnDefinition = "boolean default true")
    private Boolean isVisible;

}

package com.afpa.kawaa.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
@Table(name = "picture")
public class Picture implements Serializable {

    public Picture(String url) {
        this.url = url;
    }

    @Serial
    private static final long serialVersionUID = -3051159086470735034L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "picture_generator")
    @SequenceGenerator(name="picture_generator", sequenceName = "picture_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @NotBlank
    @Column(length = 2550)
    private String url;
}

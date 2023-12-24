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
@Table(name = "model")
public class Model implements Serializable {

    @Serial
    private static final long serialVersionUID = -4323849708211623118L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "model_generator")
    @SequenceGenerator(name="model_generator", sequenceName = "model_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @NotBlank(message = "label is required")
    @Column(name = "label")
    private String model;

}

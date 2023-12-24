package com.afpa.kawaa.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.io.Serial;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "car")
public class Car implements Serializable {
    @Serial
    private static final long serialVersionUID = -1314111443567761698L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_generator")
    @SequenceGenerator(name="car_generator", sequenceName = "car_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "model_id")
    private Model model;

    @Column(name = "license_plate")
    @Pattern(regexp = "^[A-Z]{2}-\\d{3}-[A-Z]{2}$", message = "Format de plaque d'immatriculation invalide. Le format attendu est AB-123-CD")
    private String licensePlate;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "color")
    private Color color;

    @Column(name = "place_number")
    @NotNull
    private Integer placeNumber;

    @Column(name = "luggage")
    private Boolean luggage;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean archived;

    @ToString.Exclude
    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "car_id")
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    private Set<Picture> pictures = new LinkedHashSet<>();

}
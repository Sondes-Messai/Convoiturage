package com.afpa.kawaa.domain;

import com.afpa.kawaa.domain.enume.TypeAddress;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "address")
public class Address implements Serializable {

    @Serial
    private static final long serialVersionUID = 8124267064376748214L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_generator")
    @SequenceGenerator(name="address_generator", sequenceName = "address_generator", allocationSize=1, initialValue = 1000)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_address")
    private TypeAddress typeAddress;

    @Column(name="road_name")
    @NotNull
    private String road;

    @Column(name="zip_code")
    @NotNull
    private String zipCode;

    @Column(name="town_name")
    @NotNull
    private String town;

    @Column(name="longitude")
    @NotNull(message = "La longitude ne peut pas être nulle")
    @Min(value = -180, message = "La longitude minimale autorisée est -180")
    @Max(value = 180, message = "La longitude maximale autorisée est 180")
    private double longitude;

    @Column(name="latitude")
    @NotNull(message = "La latitude ne peut pas être nulle")
    @Min(value = -90, message = "La latitude minimale autorisée est -90")
    @Max(value = 90, message = "La latitude maximale autorisée est 90")
    private double latitude;

}

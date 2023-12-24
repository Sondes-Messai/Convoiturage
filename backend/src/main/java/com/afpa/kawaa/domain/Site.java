package com.afpa.kawaa.domain;

import io.micrometer.observation.ObservationFilter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
@Setter
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "site")
public class Site implements Serializable {


    @Serial
    private static final long serialVersionUID = -754227266531577056L;
    @Id

    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_generator")
    @SequenceGenerator(name="site_generator", sequenceName = "site_generator", allocationSize=1, initialValue = 1000)
    private Long id;

    @Column(name="site_name")
    @NotNull
    private String name;

    @Column(name="visibility")
    @NotNull
    private boolean visibility;

    @Column(name="adress")
    @NotNull
    private String adress;

    @Column(name="town_name")
    @NotNull
    private String town;

    @Column(name="region_name")
    @NotNull
    private String region;

    @Column(name="zip_code")
    @NotNull
    private String zipCode;

    @Column(name="country_name")
    @NotNull
    private String country;





}

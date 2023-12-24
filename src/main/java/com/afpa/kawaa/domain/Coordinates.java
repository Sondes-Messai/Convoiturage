package com.afpa.kawaa.domain;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "coordinate")
public class Coordinates implements Serializable {
    @Serial
    private static final long serialVersionUID = -9034393409706794986L;@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coordinates_generator")
    @SequenceGenerator(name="coordinates_generator", sequenceName = "coordinates_generator", allocationSize=1, initialValue = 1)
    @Column(name = "id")
    private Long id;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

    @ManyToOne
    @JoinColumn(name = "ride_id")
    private Ride ride;

    public Coordinates(Double longitude, Double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Coordinates(Double longitude, Double latitude, Ride ride) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.ride = ride;
    }
}

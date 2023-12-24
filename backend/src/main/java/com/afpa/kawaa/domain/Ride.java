package com.afpa.kawaa.domain;

import com.afpa.kawaa.domain.enume.TypeRide;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ride")
public class Ride implements Serializable {
    @Serial
    private static final long serialVersionUID = -8034393409706794986L;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ride_generator")
    @SequenceGenerator(name="ride_generator", sequenceName = "ride_generator", allocationSize=1, initialValue = 1)
    @Column(name = "id")
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;

    @ToString.Exclude
    @ManyToMany(mappedBy = "rides")
    private Set<User> participants = new LinkedHashSet<>();

    @ToString.Exclude
    @ManyToMany
    @JoinTable(name = "ride_addresses",
            joinColumns = @JoinColumn(name = "ride_id"),
            inverseJoinColumns = @JoinColumn(name = "addresses_id"))
    @Cascade(value = org.hibernate.annotations.CascadeType.ALL)
    private Set<Address> addresses = new LinkedHashSet<>();

    @ToString.Exclude
    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    @ToString.Exclude
    @JsonIgnoreProperties("ride")
    @OneToMany(mappedBy = "ride", orphanRemoval = true)
    private Set<Reservation> reservations = new LinkedHashSet<>();

    @JoinColumn(name = "car_model")
    private String carModel;

    @JoinColumn(name = "car_brand")
    private String carBrand;

    @JoinColumn(name = "car_color")
    private String carColor;

    @JoinColumn(name = "car_license_plate")
    private String carLicensePlate;

    @JoinColumn(name = "car_luggage")
    private Boolean carLuggage;

    @Column(name = "depart_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime departDate;

    @Column(name = "arrival_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime arrivalDate;

    @Column(name = "available_seats")
    private int availableSeats;

    @Column(name="type_ride")
    @Enumerated(EnumType.STRING)
    private TypeRide typeRide;

    @Column(name = "status", columnDefinition = "boolean default false")
    private Boolean status;

    @Column
    private String message;

    @OneToMany(mappedBy = "ride", orphanRemoval = true)
    private Set<Coordinates> coordinates = new LinkedHashSet<>();

    @Column
    private String distance;

    public Ride(Ride ride) {
        this.driver = ride.driver;
        this.addresses = ride.addresses;
        this.carModel = ride.carModel;
        this.carBrand = ride.carBrand;
        this.carColor = ride.carColor;
        this.carLicensePlate = ride.carModel;
        this.carLuggage = ride.carLuggage;
        this.departDate = ride.departDate;
        this.arrivalDate = ride.arrivalDate;
        this.availableSeats = ride.availableSeats;
        this.typeRide = ride.typeRide;
        this.message = ride.message;
        this.status = ride.status;
    }
}

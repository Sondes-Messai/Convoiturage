package com.afpa.kawaa.dto;

import com.afpa.kawaa.controller.CoordinateDto;
import com.afpa.kawaa.domain.Color;
import com.afpa.kawaa.domain.Coordinates;
import com.afpa.kawaa.domain.Picture;
import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.domain.enume.StatusReserv;
import com.afpa.kawaa.domain.enume.TypeAddress;
import com.afpa.kawaa.domain.enume.TypeRide;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.afpa.kawaa.domain.Ride}
 * N'est pas un record car j'ai besoin de crée "days" et de l'ajouter
 */
@Data
public class RideDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -8034393401706794986L;

    Long id;
    Long driverId;
    String driverFirstName;
    String driverLastName;
    Set<PreferenceDto> driverPreferences;
    Picture driverPicture;
    Set<UserDto1> participants;
    Set<AddressDto> addresses;
    List<List<Double>> itenary;
    String distance;
    Long conversationId;
    String conversationName;
    Set<ReservationDto> reservations;
    String carBrand;
    String carModel;
    String carLicensePlate;
    String carColor;
    Boolean carLuggage;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime departDate;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", shape = JsonFormat.Shape.STRING)
    LocalDateTime arrivalDate;
    int availableSeats;
    TypeRide typeRide;
    List<String> days;
    Boolean status;
    String message;


    /**
     * DTO for {@link com.afpa.kawaa.domain.User}
     */
    @Value
    public static class UserDto1 implements Serializable {

        Long id;
        String firstName;
        String lastName;
    }

    /**
     * DTO for {@link com.afpa.kawaa.domain.Reservation}
     */
    @Value
    public static class ReservationDto implements Serializable {
        Long id;
        StatusReserv statusReserv;
    }

}
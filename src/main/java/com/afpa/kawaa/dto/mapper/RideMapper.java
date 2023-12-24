package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Coordinates;
import com.afpa.kawaa.domain.Ride;
import com.afpa.kawaa.dto.RideDto;
import org.mapstruct.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {CoordinatesMapper.class, PreferenceMapper.class})
public interface RideMapper {
    @Mapping(source = "conversationName", target = "conversation.name")
    @Mapping(source = "conversationId", target = "conversation.id")
    @Mapping(source = "driverLastName", target = "driver.lastName")
    @Mapping(source = "driverFirstName", target = "driver.firstName")
    @Mapping(source = "driverId", target = "driver.id")
    @Mapping(source = "driverPicture", target = "driver.picture")
    Ride toEntity(RideDto rideDto);

    @AfterMapping
    default void linkReservations(@MappingTarget Ride ride) {
        ride.getReservations().forEach(reservation -> reservation.setRide(ride));
    }

    @InheritInverseConfiguration(name = "toEntity")
    RideDto toDto(Ride ride);


    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ride partialUpdate(RideDto rideDto, @MappingTarget Ride ride);
}
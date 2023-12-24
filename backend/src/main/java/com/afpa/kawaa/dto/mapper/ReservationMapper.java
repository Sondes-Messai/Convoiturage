package com.afpa.kawaa.dto.mapper;
import com.afpa.kawaa.domain.Reservation;
import com.afpa.kawaa.dto.ReservationDto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReservationMapper {

    ReservationMapper INSTANCE = Mappers.getMapper(ReservationMapper.class);

    @Mapping(target = "ride.id", source = "rideId")
    @Mapping(target = "statusReserv", source = "status")
    @Mapping(target = "applicant.id", source = "applicantId")
    @Mapping(target = "user.id", source = "userId")
    Reservation toEntity(ReservationDto dto);

    @Mapping(target = "rideId", source = "ride.id")
    @Mapping(target = "status", source = "statusReserv")
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    @Mapping(target = "applicantId", source = "applicant.id")
    @Mapping(target = "userId", source = "user.id")
    ReservationDto toDto(Reservation entity);

}

package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.Car;
import com.afpa.kawaa.domain.Color;
import com.afpa.kawaa.dto.CarDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {ModelMapper.class, ColorMapper.class, UserMapper.class, PictureMapper.class})
public interface CarMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "modelLabel", target = "model.model")
    @Mapping(source = "brandLabel", target = "model.brand.name")
    Car toEntity(CarDto carDto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "model.model", target = "modelLabel")
    @Mapping(source = "model.brand.name", target = "brandLabel")
    CarDto toDto(Car car);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Car partialUpdate(CarDto carDto, @MappingTarget Car car);

    Car toCarUpdate(CarDto carDto, @MappingTarget Car car);


}
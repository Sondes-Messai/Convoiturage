package com.afpa.kawaa.dto.mapper;

import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.UserDto;
import com.afpa.kawaa.dto.UserInfoUpdate;
import com.afpa.kawaa.dto.UserInfoUpdateWithName;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = {CarMapper.class})
public interface UserMapper {
    User toEntity(UserDto userDto);

    @Mapping(source = "status", target = "status")
    UserDto toDto(User user);

    User toUserUpdate(UserInfoUpdate userInfoUpdate, @MappingTarget User user);

    User toUserUpdateWithName(UserInfoUpdateWithName userInfoUpdate, @MappingTarget User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(UserDto userDto, @MappingTarget User user);

    User toEntity(UserInfoUpdate userInfoUpdate);

    UserInfoUpdate toUserInfo(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User partialUpdate(UserInfoUpdate userInfoUpdate, @MappingTarget User user);
}
package com.afpa.kawaa.dto.mapper;


import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.SiteDto;
import com.afpa.kawaa.dto.UserInfoUpdate;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SiteMapper {

    SiteDto toDto(Site site);

    Site toEntity(SiteDto siteDto);

    Site toSiteUpdate(SiteDto siteInfoUpdate, @MappingTarget Site site);

}

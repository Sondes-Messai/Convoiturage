package com.afpa.kawaa.service;

import com.afpa.kawaa.domain.Address;
import com.afpa.kawaa.dto.AddressDto;
import com.afpa.kawaa.exception.AddressNotFoundException;

import java.util.List;

public interface AddressService {
    List<AddressDto> getAll();

    AddressDto getById(Long id) throws AddressNotFoundException;

    AddressDto create(AddressDto addressDto);

    List<Address> getAddressesByIds(List<Long> ids);

    Address findbyID(Long id) throws AddressNotFoundException;
}

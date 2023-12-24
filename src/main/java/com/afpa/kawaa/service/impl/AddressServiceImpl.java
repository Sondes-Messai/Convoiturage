package com.afpa.kawaa.service.impl;

import com.afpa.kawaa.domain.Address;
import com.afpa.kawaa.dto.AddressDto;
import com.afpa.kawaa.dto.mapper.AddressMapper;
import com.afpa.kawaa.exception.AddressNotFoundException;
import com.afpa.kawaa.repository.AddressRepository;
import com.afpa.kawaa.service.AddressService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service de gestion des adresses.
 */
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;



    /**
     * Récupère toutes les adresses.
     * @return Liste des adresses.
     */
    @Override
    public List<AddressDto> getAll() {
        return addressRepository.findAll().stream().map(addressMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Récupère une adresseDto par son ID.
     * @param id L'ID de l'adresse à récupérer.
     * @return L'adresse correspondante, ou null si non trouvée.
     */
    @Override
    public AddressDto getById(Long id) throws AddressNotFoundException {

        return addressMapper.toDto(findbyID(id));
    }

    /**
     * Récupère une adresse par son ID.
     * @param id L'ID de l'adresse à récupérer.
     * @return L'adresse correspondante, ou null si non trouvée.
     */
    @Override
    public Address findbyID(Long id) throws AddressNotFoundException {
        return addressRepository.findById(id).orElseThrow(AddressNotFoundException::new);
    }

    /**
     * Crée une nouvelle adresse.
     * @param addressDto L'adresse à créer.
     * @return L'adresse créée.
     */
    @Override
    public AddressDto create(AddressDto addressDto) {
        return addressMapper.toDto(addressRepository.save(addressMapper.toEntity(addressDto)));
    }


    /**
     * Récupère une liste d'adresses correspondant aux identifiants fournis.
     *
     * @param ids Liste des identifiants des adresses à récupérer.
     * @return Liste des adresses correspondantes.
     */
    @Override
    public List<Address> getAddressesByIds(List<Long> ids) {
        return addressRepository.findAllById(ids);
    }
}


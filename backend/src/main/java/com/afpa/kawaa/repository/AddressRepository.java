package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
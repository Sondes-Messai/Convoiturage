package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.ContactUsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactUsResponseRepository extends JpaRepository<ContactUsResponse, Long> {
    @Query("SELECT r FROM ContactUsResponse r WHERE :contactUsId = r.contact_us.id")
    List<ContactUsResponse> findAllById(Long contactUsId);
}

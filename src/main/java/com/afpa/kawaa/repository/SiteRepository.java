package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.domain.Site;
import com.afpa.kawaa.domain.User;
import com.afpa.kawaa.dto.SiteDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface SiteRepository extends JpaRepository<Site, Long> {
    Site findByTown(String town);
    Site findByName(String name);


    Optional<Site> findById(Long id);




}

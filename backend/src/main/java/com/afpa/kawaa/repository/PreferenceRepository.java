package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Preference;
import com.afpa.kawaa.domain.Site;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PreferenceRepository extends JpaRepository<Preference, String> {
    Preference findByLabel(String label);

    Set<Preference> findAllByLabelIn(Set<String> labels);

    Optional<Preference> findById(String label);
}
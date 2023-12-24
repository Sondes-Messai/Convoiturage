package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository <Color, String> {
}

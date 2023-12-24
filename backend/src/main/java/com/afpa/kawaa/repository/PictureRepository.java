package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Long> {
}
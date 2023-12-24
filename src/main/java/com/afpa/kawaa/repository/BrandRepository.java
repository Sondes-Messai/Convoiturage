package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.dto.BrandDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, String> {
    List<Brand> findByNameLike(String name);

    Brand findByName(String brand);
}
package com.afpa.kawaa.repository;

import com.afpa.kawaa.domain.Brand;
import com.afpa.kawaa.domain.Model;
import com.afpa.kawaa.dto.ModelDto;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ModelRepository extends JpaRepository<Model, Long> {

    @Query("select m from Model m where m.brand = :brand and upper(m.model) like upper(:model)")
    List<Model> findAllByBrandEntityAndModelContaining(Brand brand, String model);

    Optional<Model> findByModelAndBrand(@NotBlank(message = "label is required") String model, Brand brand);
}
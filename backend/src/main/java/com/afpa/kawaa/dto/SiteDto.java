package com.afpa.kawaa.dto;

import io.micrometer.observation.ObservationFilter;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Site}
 */
public record SiteDto(Long id,
                      @NotNull String name,
                      boolean visibility,
                      @NotNull String adress,
                      @NotNull String town,
                      @NotNull String region,
                      @NotNull String zipCode,
                      @NotNull String country) implements Serializable {

}
package com.afpa.kawaa.dto;

import com.afpa.kawaa.domain.enume.TypeAddress;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

/**
 * DTO for {@link com.afpa.kawaa.domain.Address}
 */
public record AddressDto(Long id , TypeAddress typeAddress, @NotNull String road, @NotNull String zipCode, @NotNull String town,
                         @Min(message = "La longitude minimale autorisée est -180", value = -180) @Max(message = "La longitude maximale autorisée est 180", value = 180) double longitude,
                         @Min(message = "La latitude minimale autorisée est -90", value = -90) @Max(message = "La latitude maximale autorisée est 90", value = 90) double latitude) implements Serializable {
}
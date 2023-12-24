package com.afpa.kawaa.exception.record;

public record FieldError(
        String entityName,
        String fieldName,
        String message,
        String code
) {
}

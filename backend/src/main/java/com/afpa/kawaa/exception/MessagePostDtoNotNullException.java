package com.afpa.kawaa.exception;

import com.afpa.kawaa.exception.record.ExceptionWithErrorResponse;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.io.Serial;

@Getter
@ToString
public class MessagePostDtoNotNullException extends RuntimeException implements ExceptionWithErrorResponse {

    @Serial
    private static final long serialVersionUID = 7946789659486114130L;
    private final String message;
    private final String code;
    private final HttpStatus httpStatus;
    private final int status;


    public MessagePostDtoNotNullException(String message) {
        this.message = message;
        this.code = "file.is.null";
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.status = httpStatus.value();

    }


}

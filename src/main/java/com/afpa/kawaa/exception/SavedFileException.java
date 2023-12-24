package com.afpa.kawaa.exception;


import com.afpa.kawaa.exception.record.ExceptionWithErrorResponse;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.io.Serial;

/**
 * SavedFileException is the exception that is thrown when the file is not saved.
 * This exception is used to send an error response to the client.
 * @author Fethi Benseddik
 */


@Getter
@ToString
public class SavedFileException extends RuntimeException implements ExceptionWithErrorResponse {

    @Serial
    private static final long serialVersionUID = 7322309811624167709L;
    private final String message;
    private final String code;
    private final HttpStatus httpStatus;
    private final int status;


    public SavedFileException(String message) {
        this.message = message;
        this.code = "file.not.saved";
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.status = httpStatus.value();

    }
}

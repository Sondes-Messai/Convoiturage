package com.afpa.kawaa.exception;


import com.afpa.kawaa.exception.record.ExceptionWithErrorResponse;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.io.Serial;

/**
 * FirebaseInitializationException is the exception we can throw when the firebase initialization failed.
 * This exception is used to send an error response to the client.
 * @author Fethi Benseddik
 */

@Getter
@ToString
public class FirebaseInitializationException extends RuntimeException implements ExceptionWithErrorResponse {

    @Serial
    private static final long serialVersionUID = -5868227603038461870L;
    private final String message;
    private final String code;
    private final HttpStatus httpStatus;
    private final int status;


    public FirebaseInitializationException(String url) {
        this.message = "Firebase initialization failed";
        this.code = "firebase.initialization.failed";
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.status = httpStatus.value();

    }
}

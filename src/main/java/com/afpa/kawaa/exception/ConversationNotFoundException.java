package com.afpa.kawaa.exception;

import com.afpa.kawaa.constants.ExceptionConstant;

public class ConversationNotFoundException extends Exception {

    public ConversationNotFoundException() {
        super(ExceptionConstant.CONVERSATION_NOT_FOUND);
    }

    public ConversationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ConversationNotFoundException(String conversationNonTrouvée) {
    }
}

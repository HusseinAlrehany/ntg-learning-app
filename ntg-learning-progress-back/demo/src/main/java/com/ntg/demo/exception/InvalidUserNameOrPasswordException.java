package com.ntg.demo.exception;


public class InvalidUserNameOrPasswordException extends RuntimeException{

    public InvalidUserNameOrPasswordException(String message) {
        super(message);
    }

    public InvalidUserNameOrPasswordException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidUserNameOrPasswordException(Throwable cause) {
        super(cause);
    }
}

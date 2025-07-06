package com.example.trackride.Infrastructures.Jwt.Exception;

public class JwtValidationException extends RuntimeException {
    public JwtValidationException(String message) {
        super(message);
    }
}

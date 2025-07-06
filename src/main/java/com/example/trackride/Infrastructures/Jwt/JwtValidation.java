package com.example.trackride.Infrastructures.Jwt;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
@AllArgsConstructor
public class JwtValidation {

    private final JwtGeneration jwtGeneration;

    private void validate(String token, UUID expectedId) {
        String extractedId = jwtGeneration.extractId(token);
        Date expiration = jwtGeneration.extractExpireDate(token);

        boolean idMismatch = !extractedId.equals(expectedId.toString());
        boolean isExpired = expiration.before(new Date());

        if (idMismatch) {
            throw new IllegalArgumentException("Token ID does not match expected user ID.");
        }

        if (isExpired) {
            throw new IllegalStateException("Token has expired.");
        }
    }

}

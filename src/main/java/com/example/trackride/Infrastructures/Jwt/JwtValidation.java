package com.example.trackride.Infrastructures.Jwt;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
@AllArgsConstructor
public class JwtValidation {

    private final JwtExtracting jwtExtracting;

    private void validate(String token, UUID expectedId) {
        String extractedId = jwtExtracting.extractId(token);
        Date expiration = jwtExtracting.extractExpireDate(token);

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

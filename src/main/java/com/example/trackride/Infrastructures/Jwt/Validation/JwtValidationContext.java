package com.example.trackride.Infrastructures.Jwt.Validation;


public record JwtValidationContext(String token, String expectedUserId) {
}

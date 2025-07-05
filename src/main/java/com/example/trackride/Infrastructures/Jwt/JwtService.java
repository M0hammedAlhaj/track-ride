package com.example.trackride.Infrastructures.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {

    private final SecretKey secretKey;

    public JwtService() {
        String key = "2XwD8eRxMvT4n9VpLF9UyBG5cD7NlKmKqY6fO9qxMzU="; // Example key (should be 256 bits and secure)
        this.secretKey = Keys.hmacShaKeyFor
                (Decoders.BASE64.decode(key));

    }

    public String generateToken(UUID id) {

        return Jwts
                .builder()
                .subject(id.toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }



}

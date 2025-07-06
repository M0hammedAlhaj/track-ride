package com.example.trackride.Infrastructures.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

@Component
@Getter
public class JwtGeneration {

    private final SecretKey secretKey;

    public JwtGeneration() {
        String key = "2XwD8eRxMvT4n9VpLF9UyBG5cD7NlKmKqY6fO9qxMzU=";
        this.secretKey = Keys.hmacShaKeyFor
                (Decoders.BASE64.decode(key));

    }


    public String generateToken(UUID id) {

        return Jwts
                .builder()
                .subject(id.toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()
                        + 60 * 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser().verifyWith(secretKey)
                .build().parseSignedClaims(token).getPayload();
    }


    private <T> T extractClaim(String token,
                               Function<Claims, T> claimsResolver) {
        final Claims claims = parseToken(token);
        return claimsResolver.apply(claims);
    }

    public String extractId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpireDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}

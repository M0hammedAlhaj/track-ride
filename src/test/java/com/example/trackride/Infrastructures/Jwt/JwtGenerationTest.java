package com.example.trackride.Infrastructures.Jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.util.Date;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;

@Slf4j
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class JwtGenerationTest {


    private JwtGeneration undertest;


    @BeforeAll
    public void setup() {
        undertest = new JwtGeneration();
    }


    @Test
    void generateTokenSuccessful() {
        // Given
        UUID uuid = UUID.randomUUID();
        String token = undertest.generateToken(uuid,"");

        // When: Parse the token
        Claims claims = Jwts.parser()
                .setSigningKey(undertest.getSecretKey()) // this method needs to be public
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Then
        assertThat(claims.getSubject()).isEqualTo(uuid.toString());
        assertThat(claims.getExpiration()).isAfter(new Date());
        assertThat(claims.getIssuedAt()).isBefore(new Date());

        log.info("Claims: {}", claims);
    }


}
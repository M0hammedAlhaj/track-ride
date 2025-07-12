package com.example.trackride.Infrastructures.Jwt.Validation;

import com.example.trackride.Infrastructures.DesginPatterns.Cor.AbstractHandler;
import com.example.trackride.Infrastructures.Jwt.Exception.JwtValidationException;
import com.example.trackride.Infrastructures.Jwt.JwtExtracting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtExpireDateValidator extends AbstractHandler<JwtValidationContext> {

    private final JwtExtracting jwtExtracting;

    @Override
    public void process(JwtValidationContext context) {
        Date expiration = jwtExtracting.extractExpireDate(context.token());
        if (expiration.before(new Date())) {
            throw new JwtValidationException("Token has expired.");
        }
    }
}

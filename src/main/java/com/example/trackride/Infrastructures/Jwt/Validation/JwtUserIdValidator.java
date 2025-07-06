package com.example.trackride.Infrastructures.Jwt.Validation;

import com.example.trackride.Infrastructures.Cor.AbstractHandler;
import com.example.trackride.Infrastructures.Jwt.JwtExtracting;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class JwtUserIdValidator extends AbstractHandler<JwtValidationContext> {

    private final JwtExtracting jwtExtracting;

    @Override
    public void process(JwtValidationContext context) {
        String actualId = jwtExtracting.extractId(context.token());

        if (!actualId.equals(context.expectedUserId())) {
            throw new IllegalArgumentException("User ID in token does not match request");
        }
    }
}

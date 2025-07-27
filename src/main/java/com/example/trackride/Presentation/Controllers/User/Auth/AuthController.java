package com.example.trackride.Presentation.Controllers.User.Auth;

import com.example.trackride.Application.User.DTO.UserLoginDTO;
import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.UseCase.UserLoginUseCase;
import com.example.trackride.Application.User.UseCase.UserRegistrationUseCase;
import com.example.trackride.Infrastructures.Jwt.JwtGeneration;
import com.example.trackride.Presentation.Controllers.Shared.StandardResponse;
import com.example.trackride.Presentation.Controllers.User.Auth.Response.LoginRequest;
import com.example.trackride.Presentation.Controllers.User.Auth.Response.RegistrationRequest;
import com.example.trackride.Presentation.Resources.UserResources;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserLoginUseCase userLoginUseCase;
    private final UserRegistrationUseCase userRegistrationUseCase;
    private final JwtGeneration jwtGeneration;

    @PostMapping("/login")
    public ResponseEntity<StandardResponse<String>> login(@Valid @RequestBody LoginRequest request) {
        var user = userLoginUseCase.execute(new UserLoginDTO(request.email(), request.password()));
        var token = jwtGeneration.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(StandardResponse.<String>builder()
                .data(token)
                .message("Login successful")
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<StandardResponse<UserResources>> register(@Valid @RequestBody RegistrationRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match.");
        }
        var user = userRegistrationUseCase.execute(new UserRegistrationDTO(request.getEmail(), request.getPassword(), request.getName()));
        return ResponseEntity.ok(StandardResponse.<UserResources>builder()
                .data(new UserResources(user))
                .message("Registration successful")
                .build());
    }
}

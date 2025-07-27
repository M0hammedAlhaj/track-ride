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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Authentication", description = "Endpoints for user login and registration")
public class AuthController {
    private final UserLoginUseCase userLoginUseCase;
    private final UserRegistrationUseCase userRegistrationUseCase;
    private final JwtGeneration jwtGeneration;

    @Operation(
            summary = "Login a user",
            description = "Authenticate a user with email and password and return a JWT token.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Successful login",
                            content = @Content(schema = @Schema(implementation = StandardResponse.class))
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid credentials")
            }
    )
    @PostMapping("/login")
    public ResponseEntity<StandardResponse<String>> login(@Valid @RequestBody LoginRequest request) {
        var user = userLoginUseCase.execute(new UserLoginDTO(request.email(), request.password()));
        var token = jwtGeneration.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(StandardResponse.<String>builder()
                .data(token)
                .message("Login successful")
                .build());
    }

    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account if password and confirmPassword match.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "User registered successfully",
                            content = @Content(schema = @Schema(implementation = StandardResponse.class))
                    ),
                    @ApiResponse(responseCode = "400", description = "Validation error or password mismatch")
            }
    )
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

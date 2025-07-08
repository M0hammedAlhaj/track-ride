package com.example.trackride.Presentation.Controllers.User.Login;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginRequest {

    @Email
    @NotBlank
    private final String email;

    @NotBlank
    private final String password;
}

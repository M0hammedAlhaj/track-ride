package com.example.trackride.Presentation.Controllers.User.Login;

import com.example.trackride.Application.User.DTO.UserLoginDTO;
import com.example.trackride.Application.User.UseCase.UserLoginUseCase;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Infrastructures.Jwt.JwtGeneration;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class LoginController {
    private final UserLoginUseCase userLoginUseCase;
    private final JwtGeneration jwtGeneration;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userLoginUseCase.execute(new UserLoginDTO(loginRequest.getEmail(), loginRequest.getPassword()));
        String token = jwtGeneration.generateToken(user.getId(), user.getEmail());
        return LoginResponse.success(token);
    }
}

package com.example.trackride.Presentation.Controllers.User.Register;

import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.UseCase.UserRegistrationUseCase;
import com.example.trackride.Core.User.Entity.User;
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
public class RegistrationController {
    private final UserRegistrationUseCase userRegistrationUseCase;

    @PostMapping("/register")
    public ResponseEntity<?> invoke(@Valid @RequestBody RegistrationRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = userRegistrationUseCase.execute(new UserRegistrationDTO(request.getEmail(),
                request.getPassword(),
                request.getName()));

        return RegistrationResponse.success(user);
    }
}

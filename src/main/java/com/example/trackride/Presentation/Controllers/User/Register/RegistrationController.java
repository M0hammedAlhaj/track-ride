package com.example.trackride.Presentation.Controllers.Clinic.Register;

import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.UseCase.UserRegistrationUseCase;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Presentation.Controllers.Clinic.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class RegistrationController {

    private final UserRegistrationUseCase userRegistrationUseCase;

    private RegistrationResponse registrationResponse;

    @PostMapping("/register")
    public ResponseEntity<?> invoke(@RequestBody RegistrationRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = userRegistrationUseCase.execute(new UserRegistrationDTO(request.getEmail(),
                request.getPassword(),
                request.getName()));

        return ResponseEntity.ok(registrationResponse.RegisterResponse(user));
    }

}

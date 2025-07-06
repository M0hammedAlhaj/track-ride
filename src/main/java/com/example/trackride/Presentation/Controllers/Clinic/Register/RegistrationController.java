package com.example.trackride.Presentation.Controllers.Clinic.Register;

import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.UseCase.UserRegistrationUseCase;
import com.example.trackride.Presentation.Controllers.Clinic.ClinicBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController(ClinicBaseController.CLINIC_API_BASE)
@RequiredArgsConstructor
public class RegistrationController {

    private final UserRegistrationUseCase userRegistrationUseCase;

    @PostMapping("/register")
    public ResponseEntity<?> invoke(@RequestBody RegistrationRequest request) {
        userRegistrationUseCase.execute(new UserRegistrationDTO(request.getEmail(),
                request.getPassword(),
                request.getName()));
        return ResponseEntity.ok().build();
    }
}

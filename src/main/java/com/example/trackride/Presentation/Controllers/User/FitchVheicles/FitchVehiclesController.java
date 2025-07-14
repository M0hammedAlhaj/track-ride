package com.example.trackride.Presentation.Controllers.User.FitchVheicles;

import com.example.trackride.Application.User.DTO.UserFitchVehiclesDTO;
import com.example.trackride.Application.User.UseCase.UserFitchVehiclesUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class FitchVehiclesController {
    private final UserFitchVehiclesUseCase useCase;

    @GetMapping("/vehicles")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication user) {
        return FitchVehiclesResponse
                .success(useCase.execute(new UserFitchVehiclesDTO(user.getId())));
    }
}

package com.example.trackride.Presentation.Controllers.User.GetVehicleCount;

import com.example.trackride.Application.User.UseCase.UserGetVehicleCountUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class GetVehicleCountController {
    private final UserGetVehicleCountUseCase userGetVehicleCountUseCase;

    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication authentication) {
        return GetVehicleCountResponse.success(userGetVehicleCountUseCase.execute(authentication.getId()));
    }
}

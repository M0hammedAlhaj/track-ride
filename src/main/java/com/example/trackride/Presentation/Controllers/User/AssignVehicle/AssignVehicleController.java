package com.example.trackride.Presentation.Controllers.User.AssignVehicle;

import com.example.trackride.Application.User.DTO.UserAssignVehicleDTO;
import com.example.trackride.Application.User.UseCase.UserAssignVehicleUseCase;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class AssignVehicleController {
    private final UserAssignVehicleUseCase assignVehicleUseCase;

    @PostMapping("/assign-vehicle")
    public ResponseEntity<?> invoke(@RequestBody @Valid AssignVehicleRequest assignVehicleRequest,
                                    @AuthenticationPrincipal UserAuthentication userAuthentication) {

        User user = assignVehicleUseCase.execute(new UserAssignVehicleDTO(userAuthentication.getId(),
                assignVehicleRequest.getLicense(),
                assignVehicleRequest.getModel(),
                assignVehicleRequest.getColor(),
                assignVehicleRequest.getYear(),
                assignVehicleRequest.getName()));
        return AssignVehicleResponse.success(user);
    }
}

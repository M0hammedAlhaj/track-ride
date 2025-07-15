package com.example.trackride.Presentation.Controllers.Vehicle.CountVehiclesByOwner;

import com.example.trackride.Application.Vehicle.UseCase.CountVehiclesByOwnerUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.Vehicle.VehicleBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(VehicleBaseController.VEHICLE_BASE_API)
@RequiredArgsConstructor
public class CountVehiclesByOwnerController {
    private final CountVehiclesByOwnerUseCase countVehiclesByOwnerUseCase;

    @GetMapping("/count-vehicles")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication authentication) {
        return CountVehiclesByOwnerResponse.success(countVehiclesByOwnerUseCase.execute(authentication.getId()));
    }
}

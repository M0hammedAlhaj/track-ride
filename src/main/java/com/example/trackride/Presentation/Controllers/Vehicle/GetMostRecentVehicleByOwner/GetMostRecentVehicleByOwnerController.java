package com.example.trackride.Presentation.Controllers.Vehicle.GetMostRecentVehicleByOwner;

import com.example.trackride.Application.Vehicle.UseCase.GetMostRecentVehicleByOwnerUseCase;
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
public class GetMostRecentVehicleByOwnerController {
    private final GetMostRecentVehicleByOwnerUseCase useCase;

    @GetMapping("most-recent")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication userAuthentication) {

        return GetMostRecentVehicleByOwnerResponse.success(useCase.execute(userAuthentication.getId()));
    }
}

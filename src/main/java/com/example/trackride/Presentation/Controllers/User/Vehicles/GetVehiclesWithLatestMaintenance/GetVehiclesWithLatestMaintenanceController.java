package com.example.trackride.Presentation.Controllers.User.Vehicles.GetVehiclesWithLatestMaintenance;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Application.Vehicle.UseCase.GetVehiclesWithLatestMaintenance;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(UserBaseController.USER_VEHICLE_API_BASE)
@RequiredArgsConstructor
public class GetVehiclesWithLatestMaintenanceController {

    private final GetVehiclesWithLatestMaintenance useCase;

    @GetMapping("/latest-maintenance")
    public ResponseEntity<?> invoke(@RequestParam int page,
                                    @RequestParam int size,
                                    @AuthenticationPrincipal UserAuthentication userAuthentication) {
        if (page < 0 || size < 1) {
            return ResponseEntity.badRequest()
                    .body("Invalid pagination parameters: page must be >= 1 and size between 1 and 100");
        }
        List<VehicleMaintenanceDTO> dto = useCase.execute(UUID.fromString(userAuthentication.getId()), page, size);

        return ResponseEntity.ok(new GetVehiclesWithLatestMaintenanceResponse(dto, "Retrieve Successful"));
    }
}

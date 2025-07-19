package com.example.trackride.Presentation.Controllers.Vehicle.UpdateVehicle;

import com.example.trackride.Application.Vehicle.DTO.VehicleUpdateDTO;
import com.example.trackride.Application.Vehicle.UseCase.UpdateVehicleUseCase;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.Vehicle.VehicleBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(VehicleBaseController.VEHICLE_BASE_API)
@RequiredArgsConstructor
public class UpdateVehicleController {
    private final UpdateVehicleUseCase useCase;

    @PutMapping("/{vehicleId}")
    public ResponseEntity<UpdateVehicleResponse> invoke(@PathVariable String vehicleId,
                                                        @RequestBody UpdateVehicleRequest request,
                                                        @AuthenticationPrincipal UserAuthentication userAuthentication) {
        Vehicle vehicle = useCase.execute(new VehicleUpdateDTO(request, userAuthentication.getId(), vehicleId));
        return ResponseEntity.ok(new UpdateVehicleResponse(vehicle, "Update Vehicle Successfully"));
    }
}

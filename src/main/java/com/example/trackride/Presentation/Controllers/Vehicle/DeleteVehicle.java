package com.example.trackride.Presentation.Controllers.Vehicle;

import com.example.trackride.Application.Vehicle.DTO.DeleteVehicleDTO;
import com.example.trackride.Application.Vehicle.UseCase.DeleteVehicleUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(VehicleBaseController.VEHICLE_BASE_API)
@RequiredArgsConstructor
public class DeleteVehicle {
    private final DeleteVehicleUseCase useCase;

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<String> delete(@PathVariable String vehicleId,
                                         @AuthenticationPrincipal UserAuthentication user) {
        useCase.execute(new DeleteVehicleDTO(vehicleId, user.getId()));
        return ResponseEntity.ok("Delete Vehicle Success");
    }
}

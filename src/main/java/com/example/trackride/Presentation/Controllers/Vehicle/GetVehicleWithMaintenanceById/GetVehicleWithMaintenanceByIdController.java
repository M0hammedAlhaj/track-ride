package com.example.trackride.Presentation.Controllers.Vehicle.GetVehicleWithMaintenanceById;

import com.example.trackride.Application.Vehicle.UseCase.GetVehicleWithMaintenanceByIdUseCase;
import com.example.trackride.Presentation.Controllers.Vehicle.VehicleBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(VehicleBaseController.VEHICLE_BASE_API)
@RequiredArgsConstructor
public class GetVehicleWithMaintenanceByIdController {
    private final GetVehicleWithMaintenanceByIdUseCase useCase;

    @GetMapping("/{vehicleId}")
    public ResponseEntity<GetVehicleWithMaintenanceByIdResponse> execute(@PathVariable String vehicleId) {

        return ResponseEntity
                .ok(new GetVehicleWithMaintenanceByIdResponse
                        (useCase.execute(UUID.fromString(vehicleId))));
    }
}

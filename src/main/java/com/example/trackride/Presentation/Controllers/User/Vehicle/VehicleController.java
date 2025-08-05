package com.example.trackride.Presentation.Controllers.User.Vehicle;

import com.example.trackride.Application.User.DTO.UserCreateVehicleDTO;
import com.example.trackride.Application.User.UseCase.CreateVehicleUseCase;
import com.example.trackride.Application.User.UseCase.GetVehiclesByOwnerUseCase;
import com.example.trackride.Application.Vehicle.DTO.DeleteVehicleDTO;
import com.example.trackride.Application.Vehicle.DTO.VehicleUpdateDTO;
import com.example.trackride.Application.Vehicle.UseCase.*;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.Shared.StandardResponse;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users/vehicles")
@RequiredArgsConstructor
public class VehicleController {
    private final CreateVehicleUseCase createVehicleUseCase;

    private final UpdateVehicleUseCase updateVehicleUseCase;

    private final DeleteVehicleUseCase deleteVehicleUseCase;

    private final CountVehiclesByOwnerUseCase countVehiclesByOwnerUseCase;

    private final GetMostRecentVehicleByOwnerUseCase getMostRecentUseCase;

    private final GetVehiclesByOwnerUseCase getVehiclesByOwnerUseCase;

    private final GetVehicleWithMaintenanceByIdUseCase getVehicleWithMaintenanceByIdUseCase;

    @GetMapping("/")
    public ResponseEntity<StandardResponse<VehicleCollection>> getVehicles(@AuthenticationPrincipal UserAuthentication userAuthentication) {
        return ResponseEntity.ok(StandardResponse.<VehicleCollection>builder()
                .data(new VehicleCollection(getVehiclesByOwnerUseCase.execute(userAuthentication.getUuid())))
                .message("Successfully retrieved vehicles")
                .build());
    }

    @PostMapping("/")
    public ResponseEntity<StandardResponse<VehicleResources>> createVehicle(@RequestBody @Valid CreateVehicleRequest createVehicleRequest,
                                                                            @AuthenticationPrincipal UserAuthentication userAuthentication) {

        var vehicle = createVehicleUseCase.execute(new UserCreateVehicleDTO(userAuthentication.getUuid(),
                createVehicleRequest.getLicense(),
                createVehicleRequest.getModel(),
                createVehicleRequest.getColor(),
                createVehicleRequest.getYear(),
                createVehicleRequest.getName()));

        return ResponseEntity.ok(StandardResponse.<VehicleResources>builder()
                .data(new VehicleResources(vehicle))
                .message("Successfully create vehicle")
                .build());
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<StandardResponse<VehicleResources>> getVehicle(@PathVariable UUID vehicleId) {

        return ResponseEntity
                .ok(StandardResponse.<VehicleResources>builder()
                        .data(new VehicleResources(getVehicleWithMaintenanceByIdUseCase.execute(vehicleId)))
                        .message("Successfully retrieved vehicle").build());
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<StandardResponse<VehicleResources>> updateVehicle(@PathVariable UUID vehicleId,
                                                                            @RequestBody UpdateVehicleRequest request,
                                                                            @AuthenticationPrincipal UserAuthentication userAuthentication) {
        Vehicle vehicle = updateVehicleUseCase.execute(new VehicleUpdateDTO(request,
                userAuthentication.getUuid(),
                vehicleId));

        return ResponseEntity.ok(StandardResponse.<VehicleResources>builder()
                .data(new VehicleResources(vehicle))
                .message("Successfully update vehicle")
                .build());
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<String> deleteVehicle(@PathVariable UUID vehicleId,
                                                @AuthenticationPrincipal UserAuthentication user) {
        deleteVehicleUseCase.execute(new DeleteVehicleDTO(vehicleId, user.getUuid()));
        return ResponseEntity.ok("Delete Vehicle Success");
    }

    @GetMapping("/count")
    public ResponseEntity<StandardResponse<Long>> countVehicles(@AuthenticationPrincipal UserAuthentication authentication) {
        return ResponseEntity.ok(StandardResponse.<Long>builder()
                .data(countVehiclesByOwnerUseCase.execute(authentication.getUuid()))
                .message("Successfully retrieved count vehicles")
                .build());
    }

    @GetMapping("most-recent")
    public ResponseEntity<StandardResponse<VehicleResources>> getMostRecent(@AuthenticationPrincipal UserAuthentication userAuthentication) {

        return ResponseEntity.ok(StandardResponse.<VehicleResources>builder()
                .data(new VehicleResources(getMostRecentUseCase.execute(userAuthentication.getUuid())))
                .message("Successfully retrieved most recent vehicles")
                .build());
    }
}

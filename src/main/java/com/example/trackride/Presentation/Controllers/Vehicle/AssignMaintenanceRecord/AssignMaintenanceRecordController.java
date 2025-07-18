package com.example.trackride.Presentation.Controllers.Vehicle.AssignMaintenanceRecord;

import com.example.trackride.Application.MaintenanceRecord.DTO.MaintenanceRecordRegistrationDTO;
import com.example.trackride.Application.MaintenanceRecord.UseCase.MaintenanceRegistrationUseCase;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.Vehicle.VehicleBaseController;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(VehicleBaseController.VEHICLE_BASE_API)
@AllArgsConstructor
public class AssignMaintenanceRecordController {
    private final MaintenanceRegistrationUseCase maintenanceRegistrationUseCase;

    @PutMapping("{vehicleId}/maintenance")
    public ResponseEntity<?> invoke(@RequestBody @Valid AssignMaintenanceRecordRequest request,
                                    @PathVariable String vehicleId,
                                    @AuthenticationPrincipal UserAuthentication userAuthentication) {

        MaintenanceRecord maintenanceRecord =
                maintenanceRegistrationUseCase.execute(new MaintenanceRecordRegistrationDTO(vehicleId,
                        request.getType(), request.getDescription(),
                        request.getPrice(), request.getReminderDate(), userAuthentication.getId()));

        return AssignMaintenanceRecordResponse.success(maintenanceRecord);
    }
}

package com.example.trackride.Presentation.Controllers.MaintenanceRecord.ChangeStatusMaintenance;

import com.example.trackride.Application.MaintenanceRecord.UseCase.ChangeStatusMaintenanceUseCase;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Presentation.Controllers.MaintenanceRecord.MaintenanceBaseController;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordResources;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(MaintenanceBaseController.Maintenance_BASE_API)
@AllArgsConstructor
public class ChangeStatusMaintenanceController {
    private final ChangeStatusMaintenanceUseCase useCase;

    @PutMapping("{maintenanceId}/")
    public ResponseEntity<MaintenanceRecordResources> invoke(@PathVariable UUID maintenanceId,
                                                             @RequestParam MaintenanceStatus status) {

        return ResponseEntity.ok(new MaintenanceRecordResources(useCase.execute(maintenanceId, status)));
    }
}

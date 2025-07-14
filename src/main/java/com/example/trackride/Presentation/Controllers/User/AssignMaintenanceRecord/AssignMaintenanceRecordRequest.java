package com.example.trackride.Presentation.Controllers.User.AssignMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class AssignMaintenanceRecordRequest {
    @NotBlank
    private String vehicleId;

    @NotBlank
    private MaintenanceType type;
}

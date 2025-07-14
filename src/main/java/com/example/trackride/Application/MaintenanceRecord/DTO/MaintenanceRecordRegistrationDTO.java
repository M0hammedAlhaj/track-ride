package com.example.trackride.Application.MaintenanceRecord.DTO;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;

public record MaintenanceRecordRegistrationDTO(String vehicleId,
                                               MaintenanceType maintenanceType,
                                               String userId) {
}

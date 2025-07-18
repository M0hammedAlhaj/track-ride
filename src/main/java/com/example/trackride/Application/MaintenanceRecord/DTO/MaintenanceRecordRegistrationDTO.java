package com.example.trackride.Application.MaintenanceRecord.DTO;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;

import java.math.BigDecimal;

public record MaintenanceRecordRegistrationDTO(String vehicleId,
                                               MaintenanceType maintenanceType,
                                               String description,
                                               BigDecimal price,
                                               String userId) {
}

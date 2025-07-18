package com.example.trackride.Application.MaintenanceRecord.DTO;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MaintenanceRecordRegistrationDTO(String vehicleId,
                                               MaintenanceType maintenanceType,
                                               String description,
                                               BigDecimal price,
                                               LocalDate reminder,
                                               String userId) {
}

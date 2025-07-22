package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetMaintenanceCostDetails;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;

import java.math.BigDecimal;
import java.util.Map;

public record GetMaintenanceCostDetailsResponse(Map<MaintenanceType, BigDecimal> data, String message) {
}

package com.example.trackride.Presentation.Controllers.MaintenanceRecord.CalculateTotalMaintenanceCost;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class CalculateTotalMaintenanceCostResponse {

    private final BigDecimal data;

    private final String message;

}

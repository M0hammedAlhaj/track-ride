package com.example.trackride.Presentation.Controllers.Vehicle.AssignMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class AssignMaintenanceRecordRequest {
    @NotNull(message = "Maintenance type is required")
    private MaintenanceType type;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
    private BigDecimal price;

    @FutureOrPresent(message = "Reminder date must be today or in the future")
    private LocalDate reminderDate;
}
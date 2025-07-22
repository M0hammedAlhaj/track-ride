package com.example.trackride.Presentation.Resources.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class MaintenanceRecordResources {
    private final String type;

    private final LocalDate created;

    private final LocalDate reminderDate;

    private final String description;

    private final BigDecimal price;

    private final MaintenanceStatus status;

    private String vehicleId;

    private String vehicleName;

    private String vehicleLicense;

    public MaintenanceRecordResources(MaintenanceRecord maintenanceRecord) {
        this.type = maintenanceRecord.getType().toString();
        this.created = maintenanceRecord.getCreatedAt().toLocalDate();
        this.reminderDate = maintenanceRecord.getReminder();
        this.price = maintenanceRecord.getPrice();
        this.description = maintenanceRecord.getDescription();
        this.status = maintenanceRecord.getStatus();
        if (maintenanceRecord.getVehicle() != null) {
            this.vehicleId = maintenanceRecord.getId().toString();
            this.vehicleName = maintenanceRecord.getVehicle().getName();
            this.vehicleLicense = maintenanceRecord.getVehicle().getLicense();
        }
    }
}

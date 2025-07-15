package com.example.trackride.Presentation.Resources.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MaintenanceRecordResources {
    private final String type;

    private final LocalDate created;

    private final LocalDate reminderDate;

    private final VehicleResources vehicleResources;

    public MaintenanceRecordResources(MaintenanceRecord maintenanceRecord) {
        this.type = maintenanceRecord.getType().toString();
        this.created = maintenanceRecord.getCreatedAt().toLocalDate();
        this.reminderDate = maintenanceRecord.getReminder();
        this.vehicleResources = new VehicleResources(maintenanceRecord.getVehicle());
    }
}

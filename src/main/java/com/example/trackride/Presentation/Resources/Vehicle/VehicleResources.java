package com.example.trackride.Presentation.Resources.Vehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordCollection;
import lombok.Getter;

@Getter
public class VehicleResources {
    private String id;

    private String license;

    private String model;

    private String color;

    private String year;

    private String name;

    private MaintenanceRecordCollection maintenanceRecords;

    public VehicleResources(Vehicle vehicle) {
        this.license = vehicle.getLicense();
        this.model = vehicle.getModel();
        this.color = vehicle.getColor();
        this.id = vehicle.getId().toString();
        this.year = vehicle.getYear().toString();
        this.name = vehicle.getName();
        if (vehicle.getMaintenanceRecords() != null) {
            this.maintenanceRecords =
                    new MaintenanceRecordCollection(vehicle.getMaintenanceRecords().stream().toList());
        }
    }
}

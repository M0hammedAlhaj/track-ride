package com.example.trackride.Application.Vehicle.DTO;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;

public record VehicleMaintenanceDTO(Vehicle vehicle , MaintenanceRecord maintenanceRecord) {
}

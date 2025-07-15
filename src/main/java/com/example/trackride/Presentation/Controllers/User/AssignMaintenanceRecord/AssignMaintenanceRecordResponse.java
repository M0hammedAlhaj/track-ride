package com.example.trackride.Presentation.Controllers.User.AssignMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordResources;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class AssignMaintenanceRecordResponse {

    public static ResponseEntity<Map<String, Object>> success(MaintenanceRecord maintenanceRecord) {
        Vehicle vehicle = maintenanceRecord.getVehicle();

        Map<String, Object> response = new HashMap<>();
        response.put("Vehicle", new VehicleResources(vehicle));
        response.put("MaintenanceRecord", new MaintenanceRecordResources(maintenanceRecord));
        response.put("message", "Maintenance Record successfully assigned");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

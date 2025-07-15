package com.example.trackride.Presentation.Controllers.User.AssignMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class AssignMaintenanceRecordResponse {

    public static ResponseEntity<Map<String, Object>> success(MaintenanceRecord maintenanceRecord) {

        Map<String, Object> response = new HashMap<>();
        response.put("data", new MaintenanceRecordResources(maintenanceRecord));
        response.put("message", "Maintenance Record successfully assigned");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}



package com.example.trackride.Presentation.Controllers.MaintenanceRecord.FetchUpcomingMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

public class FetchUpcomingMaintenanceRecordResponse {
    public static ResponseEntity<Map<String, Object>> success(LocalDate upcomingDate) {
        Map<String, Object> response = new HashMap<>();
        response.put("data",upcomingDate);
        response.put("message", "Upcoming maintenance date retrieved successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


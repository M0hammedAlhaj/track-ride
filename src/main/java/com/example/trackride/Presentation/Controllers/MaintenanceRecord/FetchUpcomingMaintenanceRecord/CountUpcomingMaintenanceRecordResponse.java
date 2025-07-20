package com.example.trackride.Presentation.Controllers.MaintenanceRecord.FetchUpcomingMaintenanceRecord;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class CountUpcomingMaintenanceRecordResponse {
    public static ResponseEntity<Map<String, Object>> success(Long countUpcoming) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", countUpcoming);
        response.put("message", "Upcoming maintenance date retrieved successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


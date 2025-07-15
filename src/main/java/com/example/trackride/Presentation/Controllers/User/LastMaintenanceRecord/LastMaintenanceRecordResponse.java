package com.example.trackride.Presentation.Controllers.User.LastMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordCollection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LastMaintenanceRecordResponse {
    public static ResponseEntity<Map<String, Object>> success(List<MaintenanceRecord> maintenanceRecords) {
        Map<String, Object> response = new HashMap<>();
        response.put("maintenanceRecords", new MaintenanceRecordCollection(maintenanceRecords));
        response.put("message", "Success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

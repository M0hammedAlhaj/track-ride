package com.example.trackride.Presentation.Controllers.User.LastMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LastMaintenanceRecordResponse {

    public static ResponseEntity<Map<String, Object>> success(List<MaintenanceRecord> maintenanceRecords) {
        var data = mapToVehicleWithLastMaintenanceRecord(maintenanceRecords);

        Map<String, Object> response = new HashMap<>();
        response.put("data", data);
        response.put("message", "Success");
        response.put("timeStamp", System.currentTimeMillis());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private static List<VehicleResources> mapToVehicleWithLastMaintenanceRecord(List<MaintenanceRecord> maintenanceRecords) {
        return maintenanceRecords.stream()
                .map(record ->
                        new VehicleResources(record.getVehicle())).collect(Collectors.toList());
    }
}

package com.example.trackride.Presentation.Controllers.User.FitchVheicles;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class FitchVehiclesResponse {

    public static ResponseEntity<Map<String, Object>> success(Set<Vehicle> vehicles) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("vehicles", new VehicleCollection(vehicles));
        return ResponseEntity.ok(response);
    }
}

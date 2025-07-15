package com.example.trackride.Presentation.Controllers.Vehicle.CountVehiclesByOwner;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class CountVehiclesByOwnerResponse {
    public static ResponseEntity<Map<String, Object>> success(Long countVehicle) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", countVehicle);
        response.put("message", "Success");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

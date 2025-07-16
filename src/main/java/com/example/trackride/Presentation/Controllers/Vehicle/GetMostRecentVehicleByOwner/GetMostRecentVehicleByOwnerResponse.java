package com.example.trackride.Presentation.Controllers.Vehicle.GetMostRecentVehicleByOwner;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class GetMostRecentVehicleByOwnerResponse {

    public static ResponseEntity<Map<String, Object>> success(Optional<Vehicle> vehicle) {
        Map<String, Object> response = new HashMap<>();
        response.put("data", vehicle.map(VehicleResources::new).orElse(null));
        response.put("message", " successfully get most recent vehicle");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

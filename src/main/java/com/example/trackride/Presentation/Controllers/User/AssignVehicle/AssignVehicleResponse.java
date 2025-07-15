package com.example.trackride.Presentation.Controllers.User.AssignVehicle;

import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Presentation.Resources.UserResources;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;


public class AssignVehicleResponse  {
    public static ResponseEntity<Map<String, Object>> success(User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new UserResources(user));
        return ResponseEntity.ok(response);
    }
}

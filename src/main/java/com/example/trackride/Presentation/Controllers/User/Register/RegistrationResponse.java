package com.example.trackride.Presentation.Controllers.User.Register;

import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Presentation.Resources.UserResources;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

@Data
public class RegistrationResponse {
    public static ResponseEntity<HashMap<String, Object>> success(User user) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("user", new UserResources(user));
        response.put("message", "Registration Successful");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}

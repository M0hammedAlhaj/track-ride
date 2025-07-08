package com.example.trackride.Presentation.Controllers.User.Login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public class LoginResponse {


    public static ResponseEntity<HashMap<String, Object>> success(String token) {
        HashMap<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("token", token);
        response.put("message", "Login Successful");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

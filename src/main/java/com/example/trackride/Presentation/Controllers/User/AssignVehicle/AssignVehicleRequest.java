package com.example.trackride.Presentation.Controllers.User.AssignVehicle;

import lombok.Data;

@Data
public class AssignVehicleRequest {
    private String license;
    private String model;
    private String color;
}

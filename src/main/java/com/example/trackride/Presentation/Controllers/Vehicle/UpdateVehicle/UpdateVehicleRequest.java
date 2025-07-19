package com.example.trackride.Presentation.Controllers.Vehicle.UpdateVehicle;

import lombok.Getter;

import java.time.Year;

@Getter
public class UpdateVehicleRequest {
    private String name;

    private String license;

    private String model;

    private String color;

    private Year year;
}

package com.example.trackride.Core.Vehicle.Factory;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleFactory {
    public Vehicle create(String license,
                          String model ,
                          String color) {

        return Vehicle.builder()
                .license(license)
                .color(color)
                .model(model)
                .build();
    }
}
package com.example.trackride.Core.Vehicle.Factory;

import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;

public class VehicleFactory {
    public Vehicle create(String license,
                          String model ,
                          String color,
                          User owner) {

        return Vehicle.builder()
                .license(license)
                .color(color)
                .model(model)
                .owner(owner)
                .build();
    }
}

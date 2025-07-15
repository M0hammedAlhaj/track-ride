package com.example.trackride.Core.Vehicle.Factory;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import org.springframework.stereotype.Component;

import java.time.Year;

@Component
public class VehicleFactory {
    public Vehicle create(String license,
                          String model,
                          String color,
                          String year,
                          String name) {

        return Vehicle.builder()
                .license(license)
                .color(color)
                .model(model)
                .year(Year.of(Integer.parseInt(year)))
                .name(name)
                .build();
    }

}
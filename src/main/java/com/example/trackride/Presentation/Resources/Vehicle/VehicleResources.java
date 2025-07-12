package com.example.trackride.Presentation.Resources.Vehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import lombok.Getter;

@Getter
public class VehicleResources {
    private String license;

    private String model;

    private String color;

    public VehicleResources(Vehicle vehicle) {
        this.license = vehicle.getLicense();
        this.model = vehicle.getModel();
        this.color = vehicle.getColor();
    }
}

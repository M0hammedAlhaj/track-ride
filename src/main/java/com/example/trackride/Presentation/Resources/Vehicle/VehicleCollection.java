package com.example.trackride.Presentation.Resources.Vehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
public class VehicleCollection {
    @JsonValue
    private final List<VehicleResources> vehicles;

    public VehicleCollection(Set<Vehicle> vehicles) {
        this.vehicles = vehicles.stream().map(VehicleResources::new)
                .toList();
    }
}

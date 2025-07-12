package com.example.trackride.Presentation.Resources.Vehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
public class VehicleCollection {

    private List<VehicleResources> vehicleResources;

    public VehicleCollection(Set<Vehicle> vehicles) {
       vehicleResources= vehicles.stream().map(VehicleResources::new)
               .toList();
    }
}

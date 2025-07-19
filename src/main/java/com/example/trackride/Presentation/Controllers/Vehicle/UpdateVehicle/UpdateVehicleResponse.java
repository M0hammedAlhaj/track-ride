package com.example.trackride.Presentation.Controllers.Vehicle.UpdateVehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import lombok.Getter;

@Getter
public class UpdateVehicleResponse {

    private VehicleResources data;

    private String message;

    public UpdateVehicleResponse(Vehicle vehicle, String message) {
        this.data = new VehicleResources(vehicle);
        this.message = message;
    }
}

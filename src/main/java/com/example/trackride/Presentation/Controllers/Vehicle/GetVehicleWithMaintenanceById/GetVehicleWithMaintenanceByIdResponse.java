package com.example.trackride.Presentation.Controllers.Vehicle.GetVehicleWithMaintenanceById;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleResources;
import lombok.Getter;

@Getter
public class GetVehicleWithMaintenanceByIdResponse {
    private final VehicleResources data;

    private final String message;

    public GetVehicleWithMaintenanceByIdResponse(Vehicle data) {
        this(data,"Success");
    }
    public GetVehicleWithMaintenanceByIdResponse(Vehicle data,String message) {
        this.message = message;
        this.data = new VehicleResources(data);
    }
}

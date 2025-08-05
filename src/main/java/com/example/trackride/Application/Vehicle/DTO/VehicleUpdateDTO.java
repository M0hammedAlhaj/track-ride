package com.example.trackride.Application.Vehicle.DTO;

import com.example.trackride.Presentation.Controllers.User.Vehicle.UpdateVehicleRequest;
import lombok.Getter;
import lombok.Setter;

import java.time.Year;
import java.util.UUID;

@Getter
@Setter
public class VehicleUpdateDTO {
    private UUID userId;
    private UUID vehicleId;
    private String license;
    private String model;
    private String color;
    private Year year;
    private String name;

    public VehicleUpdateDTO(UpdateVehicleRequest request, UUID userId, UUID vehicleId) {
        this.userId = userId;
        this.vehicleId = vehicleId;

        if (request.getLicense() != null) {
            this.license = request.getLicense();
        }
        if (request.getModel() != null) {
            this.model = request.getModel();
        }
        if (request.getColor() != null) {
            this.color = request.getColor();
        }
        if (request.getYear() != null) {
            this.year = request.getYear();
        }
        if (request.getName() != null) {
            this.name = request.getName();
        }
    }
}

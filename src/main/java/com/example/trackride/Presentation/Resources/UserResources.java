package com.example.trackride.Presentation.Resources;

import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import lombok.Getter;

@Getter
public class UserResources {

    private final String uuid;

    private final String email;

    private final String name;

    private VehicleCollection vehicles;

    public UserResources(User user) {
        this.uuid = user.getId().toString();
        this.email = user.getEmail();
        this.name = user.getName();
        if (user.getVehicles() != null && !user.getVehicles().isEmpty()) {
            vehicles = new VehicleCollection(user.getVehicles());
        }
    }
}

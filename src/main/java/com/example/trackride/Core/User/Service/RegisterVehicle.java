package com.example.trackride.Core.User.Service;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegisterVehicle {
    private final VehicleRepository vehicleRepository;


}

/*
//Core change state of domain
User registration
Use Case userRegistrationVehicle
*/

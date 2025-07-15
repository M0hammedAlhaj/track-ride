package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserGetVehicleCountUseCase {
    private VehicleRepository vehicleRepository;

    public Long execute(String userId) {
        return vehicleRepository.countVehiclesByOwnerId(UUID.fromString(userId));
    }
}

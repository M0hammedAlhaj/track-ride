package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class GetVehiclesByOwnerUseCase {
    private final VehicleRepository vehicleRepository;

    public Set<Vehicle> execute(UUID ownerId) {

        return vehicleRepository.findVehiclesByOwnerId(ownerId);
    }
}

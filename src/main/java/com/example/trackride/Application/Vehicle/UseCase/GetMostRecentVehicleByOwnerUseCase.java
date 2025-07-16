package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetMostRecentVehicleByOwnerUseCase {
    private final VehicleRepository vehicleRepository;

    public Optional<Vehicle> execute(String userId) {
        return vehicleRepository.findMostRecentVehicleByOwnerId(UUID.fromString(userId));
    }
}

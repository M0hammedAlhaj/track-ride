package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetMostRecentVehicleByOwnerUseCase {
    private final VehicleRepository vehicleRepository;

    public Vehicle execute(UUID userId) {
        return vehicleRepository.findMostRecentVehicleByOwnerId(userId)
                .orElse(null);
    }
}

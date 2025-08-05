package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CountVehiclesByOwnerUseCase {
    private final VehicleRepository vehicleRepository;

    public Long execute(UUID userId) {
        return vehicleRepository.countVehiclesByOwnerId(userId);
    }
}

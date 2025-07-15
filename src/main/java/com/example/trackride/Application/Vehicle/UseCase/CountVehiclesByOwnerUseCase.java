package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserGetVehicleCountUseCase {
    private final VehicleRepository vehicleRepository;

    public Long execute(String userId) {
        return vehicleRepository.countVehiclesByOwnerId(UUID.fromString(userId));
    }
}

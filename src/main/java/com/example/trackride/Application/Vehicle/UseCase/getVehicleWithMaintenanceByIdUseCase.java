package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class getVehicleWithMaintenanceByIdUseCase {
    private final VehicleRepository vehicleRepository;

    public Vehicle execute(UUID vehicleId) {
        return vehicleRepository.findVehicleWithMaintenanceRecordById(vehicleId);
    }
}

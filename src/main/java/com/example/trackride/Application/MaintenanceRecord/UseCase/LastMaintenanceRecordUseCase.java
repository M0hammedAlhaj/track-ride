package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class LastMaintenanceRecordUseCase {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public List<MaintenanceRecord> execute(String userId) {
        var user = userRepository.findUserByIdWithVehicles(UUID.fromString(userId))
                .orElseThrow(() -> new ResourceNotFoundException(userId));

        List<MaintenanceRecord> maintenanceRecords = new ArrayList<>();
        user.getVehicles()
                .forEach(vehicle -> {
                    MaintenanceRecord record = vehicleRepository.findById(vehicle.getId())
                            .flatMap(v -> maintenanceRecordRepository.findLastMaintenanceRecordByVehicleId(v.getId()))
                            .orElse(null);
                    maintenanceRecords.add(record);
                });

        return maintenanceRecords;
    }
}
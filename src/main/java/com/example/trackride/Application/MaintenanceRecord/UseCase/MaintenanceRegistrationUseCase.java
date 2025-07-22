package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Application.MaintenanceRecord.DTO.MaintenanceRecordRegistrationDTO;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Factory.MaintenanceRecordFactory;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
public class MaintenanceRegistrationUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    private final MaintenanceRecordFactory factory;

    private final VehicleRepository vehicleRepository;

    private final UserRepository userRepository;

    @Transactional
    public MaintenanceRecord execute(MaintenanceRecordRegistrationDTO registrationDTO) {
        MaintenanceRecord maintenanceRecord = factory.create(registrationDTO.maintenanceType(),
                registrationDTO.reminder(),
                registrationDTO.description(),
                registrationDTO.price());

        User user = userRepository.findById(UUID.fromString(registrationDTO.userId()))
                .orElseThrow(() -> new ResourceNotFoundException(registrationDTO.userId()));

        Vehicle vehicle = vehicleRepository.
                findById(UUID.fromString(registrationDTO.vehicleId()))
                .orElseThrow(() -> new ResourceNotFoundException(registrationDTO.vehicleId()));

        if (!vehicle.belongsTo(user)) {
            throw new UserAccessException("User don't have access to this vehicle");
        }

        maintenanceRecord.assignVehicle(vehicle);
        return maintenanceRecordRepository.save(maintenanceRecord);
    }
}

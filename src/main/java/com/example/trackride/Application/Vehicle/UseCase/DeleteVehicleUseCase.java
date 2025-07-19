package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Application.Vehicle.DTO.DeleteVehicleDTO;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeleteVehicleUseCase {
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @Transactional
    public void execute(DeleteVehicleDTO dto) {
        User user = userRepository.findById(UUID.fromString(dto.userID()))
                .orElseThrow(() -> new ResourceNotFoundException(dto.userID()));

        Vehicle vehicle = vehicleRepository.findById(UUID.fromString(dto.vehicleId()))
                .orElseThrow(() -> new ResourceNotFoundException(dto.vehicleId()));

        if (!vehicle.belongsTo(user)) {
            throw new UserAccessException("user don't have authorize");
        }
        vehicleRepository.delete(vehicle);
    }
}

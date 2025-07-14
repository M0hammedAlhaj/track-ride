package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserFitchVehiclesDTO;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserFitchVehiclesUseCase {
    private final UserRepository userRepository;

    private final VehicleRepository vehicleRepository;

    public Set<Vehicle> execute(UserFitchVehiclesDTO dto) {
        UUID ownerId = UUID.fromString(dto.userID());
        if (userRepository.findById(ownerId).isEmpty()) {
            throw new ResourceNotFoundException(dto.userID());
        }
        return vehicleRepository.findVehiclesByOwnerId(ownerId);
    }
}

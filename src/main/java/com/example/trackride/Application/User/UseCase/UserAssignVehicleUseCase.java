package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserAssignVehicleDTO;
import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Application.Vehicle.UseCase.VehicleRegistrationUseCase;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserAssignVehicleUseCase {
    private UserRepository userRepository;
    private VehicleRegistrationUseCase vehicleRegistration;

    public User execute(UserAssignVehicleDTO dto) {
        User user = userRepository.findById(UUID.fromString(dto.id()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = vehicleRegistration.execute(new VehicleRegistrationDTO(dto.license(), dto.model(), dto.color()));
        user.assignVehicle(vehicle);
        return user;
    }
}

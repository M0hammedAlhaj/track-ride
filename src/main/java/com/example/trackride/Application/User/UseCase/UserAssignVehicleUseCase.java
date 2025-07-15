package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserAssignVehicleDTO;
import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Application.Vehicle.UseCase.VehicleRegistrationUseCase;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserAssignVehicleUseCase {
    private final UserRepository userRepository;
    private final VehicleRegistrationUseCase vehicleRegistration;

    @Transactional
    public User execute(UserAssignVehicleDTO dto) {
        User user = userRepository.findById(UUID.fromString(dto.id()))
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User not found By %s ", dto.id())));

        Vehicle vehicle = vehicleRegistration.execute(new VehicleRegistrationDTO(dto.license(),
                dto.model(),
                dto.color(),
                dto.year(),
                dto.name()));

        user.assignVehicle(vehicle);
        userRepository.update(user);
        return user;
    }
}

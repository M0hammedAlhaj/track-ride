package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserCreateVehicleDTO;
import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Application.Vehicle.UseCase.VehicleRegistrationUseCase;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CreateVehicleUseCase {
    private final UserRepository userRepository;
    private final VehicleRegistrationUseCase vehicleRegistration;

    @Transactional
    public Vehicle execute(UserCreateVehicleDTO dto) {
        User user = userRepository.findById(dto.id())
                .orElseThrow(() -> new ResourceNotFoundException(String.format("User not found By %s ", dto.id())));

        Vehicle vehicle = vehicleRegistration.execute(new VehicleRegistrationDTO(dto.license(),
                dto.model(),
                dto.color(),
                dto.year(),
                dto.name()));

        user.assignVehicle(vehicle);
        userRepository.update(user);
        return vehicle;
    }
}

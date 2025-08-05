package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Application.Vehicle.DTO.VehicleUpdateDTO;
import com.example.trackride.Core.Shared.Exception.DuplicateResourceException;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;

@Service
@RequiredArgsConstructor
public class UpdateVehicleUseCase {
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @Transactional
    public Vehicle execute(VehicleUpdateDTO dto) {

        var vehicleId = dto.getVehicleId();
        var userId = dto.getUserId();

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException(vehicleId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(userId));

        if (!vehicle.belongsTo(user)) {
            throw new UserAccessException("User not have authorize");
        }

        updateVehicleDetails(vehicle, dto);
        return vehicleRepository.update(vehicle);
    }

    private void updateVehicleDetails(Vehicle vehicle, VehicleUpdateDTO dto) {
        String license = dto.getLicense();
        String model = dto.getModel();
        String color = dto.getColor();
        String name = dto.getName();
        Year year = dto.getYear();

        if (license != null && !license.equals(vehicle.getLicense())) {
            if (vehicleRepository.vehicleExistByLicense(license)) {
                throw new DuplicateResourceException(
                        "Vehicle with license '" + license + "' already exists."
                );
            }
            vehicle.setLicense(license);
        }

        if (model != null) {
            vehicle.setModel(model);
        }

        if (color != null) {
            vehicle.setColor(color);
        }

        if (name != null) {
            vehicle.setName(name);
        }

        if (year != null) {
            vehicle.setYear(year);
        }
    }
}

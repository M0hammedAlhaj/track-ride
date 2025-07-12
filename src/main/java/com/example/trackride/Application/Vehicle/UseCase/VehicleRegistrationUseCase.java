package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Factory.VehicleFactory;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VehicleRegistrationUseCase {
    private final VehicleRepository vehicleRepository;
    private final VehicleFactory factory;

    public Vehicle execute(VehicleRegistrationDTO dto) {
        if (vehicleRepository.vehicleExistByLicense(dto.license())) {
            throw new ResourceNotFoundException("License not found");
        }

        Vehicle vehicle = factory.create(dto.license(), dto.model(), dto.color());
        vehicleRepository.save(vehicle);
        return vehicle;
    }
}

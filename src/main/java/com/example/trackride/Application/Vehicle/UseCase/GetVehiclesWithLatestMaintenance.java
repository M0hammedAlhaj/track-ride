package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetVehiclesWithLatestMaintenance {
    private final UserRepository userRepository;

    private final VehicleRepository vehicleRepository;

    public List<VehicleMaintenanceDTO> execute(UUID userId, int page, int size) {
        if (!userRepository.existById(userId)) {
            throw new UserAccessException("User don't have authroize");
        }
        return vehicleRepository.findVehiclesWithLatestMaintenanceByOwnerIdAndPagination(userId, page, size);
    }
}

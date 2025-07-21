package com.example.trackride.Core.Vehicle.Repository;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Core.Shared.Base.BaseRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface VehicleRepository extends BaseRepository<Vehicle> {
    boolean vehicleExistByLicense(String license);

    Set<Vehicle> findVehiclesByOwnerId(UUID ownerId);

    Vehicle findVehicleWithMaintenanceRecordById(UUID vehicleId);

    Long countVehiclesByOwnerId(UUID ownerId);

    Optional<Vehicle> findMostRecentVehicleByOwnerId(UUID ownerId);

    List<VehicleMaintenanceDTO> findVehiclesWithLatestMaintenanceByOwnerIdAndPagination(UUID ownerId, int page, int size);
}

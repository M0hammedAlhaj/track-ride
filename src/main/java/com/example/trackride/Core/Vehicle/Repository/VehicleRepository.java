package com.example.trackride.Core.Vehicle.Repository;

import com.example.trackride.Core.Shared.Base.BaseRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface VehicleRepository extends BaseRepository<Vehicle> {
    boolean vehicleExistByLicense(String license);

    Set<Vehicle> findVehiclesByOwnerId(UUID ownerId);

    Vehicle findVehicleByIdWithMaintenanceRecord(UUID vehicleId);

    Long countVehiclesByOwnerId(UUID ownerId);

    Optional<Vehicle> findMostRecentVehicleByOwnerId(UUID ownerId);
}

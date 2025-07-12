package com.example.trackride.Core.Vehicle.Repository;

import com.example.trackride.Core.Shared.Base.BaseRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;

public interface VehicleRepository extends BaseRepository<Vehicle> {
    boolean vehicleExistByLicense(String license);

}

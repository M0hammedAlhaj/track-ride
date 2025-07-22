package com.example.trackride.Core.MaintenanceRecord.Repository;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Core.Shared.Base.BaseRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MaintenanceRecordRepository extends BaseRepository<MaintenanceRecord> {
    Optional<MaintenanceRecord> findLastMaintenanceRecordByVehicleId(UUID vehicleId);

    Long countFirstUpcomingMaintenanceByOwnerId(UUID ownerId);

    List<MaintenanceRecord> findFirstMaintenanceRecordByOwnerIdAndStatus(UUID ownerId, MaintenanceStatus status);

    Long countOverdueMaintenanceRecordsByOwnerId(UUID ownerId);

    BigDecimal calculateTotalMaintenanceByOwnerId(UUID ownerId);

    BigDecimal calculateLastMonthMaintenanceCostByOwnerId(UUID ownerId);
}

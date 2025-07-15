package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FetchUpcomingMaintenanceRecordsUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public LocalDate execute(String userId) {
        return maintenanceRecordRepository.findFirstUpcomingMaintenanceByOwnerId(UUID.fromString(userId))
                .orElse(null);
    }
}

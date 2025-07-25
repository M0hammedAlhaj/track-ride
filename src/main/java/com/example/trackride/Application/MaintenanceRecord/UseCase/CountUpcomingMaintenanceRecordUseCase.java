package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CountUpcomingMaintenanceRecordUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public Long execute(String userId) {
        return maintenanceRecordRepository.countFirstUpcomingMaintenanceByOwnerId(UUID.fromString(userId));
    }
}

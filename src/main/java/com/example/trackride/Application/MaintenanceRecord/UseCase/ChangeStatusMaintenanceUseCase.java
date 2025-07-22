package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChangeStatusMaintenanceUseCase {

    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public MaintenanceRecord execute(UUID maintenanceId) {
        MaintenanceRecord maintenanceRecord = maintenanceRecordRepository.findById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance Record not found"));
        return maintenanceRecordRepository.update(maintenanceRecord);
    }
}

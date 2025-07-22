package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChangeStatusMaintenanceUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    @Transactional
    public MaintenanceRecord execute(UUID maintenanceId, MaintenanceStatus maintenanceStatus) {
        MaintenanceRecord maintenanceRecord = maintenanceRecordRepository.findById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance Record not found"));
        maintenanceRecord.setStatus(maintenanceStatus);
        return maintenanceRecordRepository.update(maintenanceRecord);
    }
}

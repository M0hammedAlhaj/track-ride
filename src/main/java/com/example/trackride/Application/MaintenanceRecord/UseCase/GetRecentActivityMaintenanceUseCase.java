package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetRecentActivityMaintenanceUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public ResponseEntity<?> execute() {
        return null;
    }
}

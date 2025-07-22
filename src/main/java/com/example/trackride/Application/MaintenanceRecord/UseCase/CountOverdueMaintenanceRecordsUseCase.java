package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Application.MaintenanceRecord.DTO.CountOverdueMaintenanceRecordsDTO;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CountOverdueMaintenanceRecordsUseCase {

    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long execute(CountOverdueMaintenanceRecordsDTO dto) {
        User owner = userRepository.findById(dto.ownerId())
                .orElseThrow(() -> new ResourceNotFoundException(dto.ownerId().toString()));
        return maintenanceRecordRepository.countOverdueMaintenanceRecordsByOwnerId(owner.getId());
    }
}

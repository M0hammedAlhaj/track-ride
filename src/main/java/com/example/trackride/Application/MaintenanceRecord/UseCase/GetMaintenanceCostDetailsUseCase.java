package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

@Service
@AllArgsConstructor
public class GetMaintenanceCostDetailsUseCase {
    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final UserRepository userRepository;

    public Map<MaintenanceType, BigDecimal> execute(UUID ownerId) {
        if (!userRepository.existById(ownerId)) {
            throw new UserAccessException("User don't have access");
        }
        return maintenanceRecordRepository.calculateMaintenanceDetailsByOwnerId(ownerId);
    }
}

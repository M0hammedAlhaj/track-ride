package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GetOwnerMaintenanceCostForLastMonth {
    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final UserRepository userRepository;

    public BigDecimal execute(UUID ownerId) {
        if (!userRepository.existById(ownerId)) {
            throw new UserAccessException("User not have access");
        }
        return maintenanceRecordRepository.calculateLastMonthMaintenanceCostByOwnerId(ownerId);
    }
}

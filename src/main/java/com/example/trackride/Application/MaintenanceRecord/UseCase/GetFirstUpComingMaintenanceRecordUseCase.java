package com.example.trackride.Application.MaintenanceRecord.UseCase;

import com.example.trackride.Application.MaintenanceRecord.DTO.GetFirstUpComingMaintenanceRecordDTO;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetFirstUpComingMaintenanceRecordUseCase {

    private final UserRepository userRepository;
    private final MaintenanceRecordRepository maintenanceRecordRepository;

    public List<MaintenanceRecord> execute(GetFirstUpComingMaintenanceRecordDTO dto) {
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException(dto.userId().toString()));
        return maintenanceRecordRepository.findFirstMaintenanceRecordByOwnerIdAndStatus(user.getId(), MaintenanceStatus.UP_COMING);
    }
}

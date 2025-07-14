package com.example.trackride.Core.MaintenanceRecord.Factory;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceTimeType;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class MaintenanceRecordFactory {
    public MaintenanceRecord create(MaintenanceType type) {
        return MaintenanceRecord.builder()
                .reminder(LocalDate.now().plusDays(MaintenanceTimeType.getRule(type).timeInterval()))
                .type(type)
                .isNotify(false)
                .build();
    }
}

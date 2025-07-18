package com.example.trackride.Core.MaintenanceRecord.Factory;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceTimeType;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class MaintenanceRecordFactory {
    public MaintenanceRecord create(MaintenanceType type,
                                    LocalDate reminder,
                                    String description,
                                    BigDecimal price) {
        if (reminder == null) {
            long days = MaintenanceTimeType.getRule(type).timeInterval();
            reminder = LocalDate.now().plusDays(days);
        }

        return MaintenanceRecord.builder()
                .reminder(reminder)
                .type(type)
                .isNotify(false)
                .description(description)
                .price(price)
                .build();
    }
}

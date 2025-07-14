package com.example.trackride.Presentation.Resources;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MaintenanceRecordResources {
    private final String type;

    private final LocalDate created;

    private final LocalDate reminderDate;


    public MaintenanceRecordResources(MaintenanceRecord maintenanceRecord) {
        this.type = maintenanceRecord.getType().toString();
        this.created = maintenanceRecord.getCreatedAt().toLocalDate();
        this.reminderDate = maintenanceRecord.getReminder();
    }
}

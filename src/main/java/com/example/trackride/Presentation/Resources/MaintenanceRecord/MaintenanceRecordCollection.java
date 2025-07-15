package com.example.trackride.Presentation.Resources.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import lombok.Getter;

import java.util.List;
import java.util.Objects;

@Getter
public class MaintenanceRecordCollection {

    private final List<MaintenanceRecordResources> maintenanceRecordResources;

    public MaintenanceRecordCollection(List<MaintenanceRecord> maintenanceRecords) {
        this.maintenanceRecordResources = maintenanceRecords.stream()
                .filter(Objects::nonNull)
                .map(MaintenanceRecordResources::new)
                .toList();
    }
}

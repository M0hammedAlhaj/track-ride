package com.example.trackride.Presentation.Resources.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.List;
import java.util.Objects;

@Getter
public class MaintenanceRecordCollection {

    @JsonValue
    private final List<MaintenanceRecordResources> maintenanceRecords;

    public MaintenanceRecordCollection(List<MaintenanceRecord> maintenanceRecords) {
        this.maintenanceRecords = maintenanceRecords.stream()
                .filter(Objects::nonNull)
                .map(MaintenanceRecordResources::new)
                .toList();
    }
}

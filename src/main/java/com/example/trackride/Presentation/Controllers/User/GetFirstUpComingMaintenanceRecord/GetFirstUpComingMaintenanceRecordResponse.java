package com.example.trackride.Presentation.Controllers.User.GetFirstUpComingMaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordCollection;
import lombok.Getter;

import java.util.List;

@Getter
public class GetFirstUpComingMaintenanceRecordResponse {
    private final MaintenanceRecordCollection data;

    private final String message;

    public GetFirstUpComingMaintenanceRecordResponse(List<MaintenanceRecord> maintenanceRecords, String message) {
        this.data = new MaintenanceRecordCollection(maintenanceRecords);
        this.message = message;
    }
}
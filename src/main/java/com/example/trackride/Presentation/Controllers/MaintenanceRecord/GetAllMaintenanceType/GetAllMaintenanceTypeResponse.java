package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetAllMaintenanceType;

import com.example.trackride.Presentation.Resources.MaintenanceRule.MaintenanceRuleCollection;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public class GetAllMaintenanceTypeResponse {
    private final MaintenanceRuleCollection data;

    private final String message;

    public GetAllMaintenanceTypeResponse() {
        this.data = new MaintenanceRuleCollection();
        this.message = "Successfully retrieved all maintenance rules";
    }
}


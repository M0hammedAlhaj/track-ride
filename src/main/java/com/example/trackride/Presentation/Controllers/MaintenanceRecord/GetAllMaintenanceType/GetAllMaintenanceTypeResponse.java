package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetAllMaintenanceType;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceRule;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceTimeType;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class GetAllMaintenanceTypeResponse {

    private final List<MaintenanceRuleResponse> data;
    private final String message;

    public GetAllMaintenanceTypeResponse() {
        Map<MaintenanceType, MaintenanceRule> rulesMap = MaintenanceTimeType.getAllRules();

        this.data = rulesMap.entrySet().stream()
                .map(entry -> new MaintenanceRuleResponse(
                        entry.getKey().name(),               // English key
                        entry.getKey().getArabicName(),      // Arabic name
                        entry.getValue().distanceIntervalKm(),
                        entry.getValue().timeInterval()
                ))
                .collect(Collectors.toList());

        this.message = "Successfully retrieved all maintenance rules";
    }
}

record MaintenanceRuleResponse(String key,
                               String arabicName,
                               Long distanceIntervalKm,
                               long timeInterval) {
}


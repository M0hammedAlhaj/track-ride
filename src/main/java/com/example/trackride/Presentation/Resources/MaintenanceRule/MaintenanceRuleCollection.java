package com.example.trackride.Presentation.Resources.MaintenanceRule;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceRule;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceTimeType;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class MaintenanceRuleCollection {
    @JsonValue
    private final List<MaintenanceRuleResources> data;

    public MaintenanceRuleCollection() {
        Map<MaintenanceType, MaintenanceRule> rulesMap = MaintenanceTimeType.getAllRules();

        this.data = rulesMap.entrySet().stream()
                .map(entry -> new MaintenanceRuleResources(
                        entry.getKey().name(),
                        entry.getKey().getArabicName(),
                        entry.getValue().timeInterval()
                ))
                .collect(Collectors.toList());

    }
}

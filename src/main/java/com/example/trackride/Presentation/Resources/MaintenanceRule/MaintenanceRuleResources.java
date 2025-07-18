package com.example.trackride.Presentation.Resources.MaintenanceRule;

import lombok.Getter;

@Getter
public class MaintenanceRuleResources {
    private String key;
    private String arabicName;
    private Long distanceIntervalKm;

    public MaintenanceRuleResources(String key, String arabicName, Long distanceIntervalKm) {
        this.key = key;
        this.arabicName = arabicName;
        this.distanceIntervalKm = distanceIntervalKm;
    }
}

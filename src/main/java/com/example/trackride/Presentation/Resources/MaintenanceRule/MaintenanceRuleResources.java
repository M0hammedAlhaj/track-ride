package com.example.trackride.Presentation.Resources.MaintenanceRule;

import lombok.Getter;

@Getter
public class MaintenanceRuleResources {
    private String key;
    private String arabicName;
    private Long timeInterval;

    public MaintenanceRuleResources(String key, String arabicName, Long timeInterval) {
        this.key = key;
        this.arabicName = arabicName;
        this.timeInterval = timeInterval;
    }
}

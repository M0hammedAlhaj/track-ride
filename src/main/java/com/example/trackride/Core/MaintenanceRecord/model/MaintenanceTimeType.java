package com.example.trackride.Core.MaintenanceRecord.model;

import java.util.EnumMap;
import java.util.Map;



public class MaintenanceTimeType {
    private static final Map<MaintenanceType, MaintenanceRule> maintenanceRules =
            new EnumMap<>(MaintenanceType.class);

    static {
        maintenanceRules.put(MaintenanceType.OIL_CHANGE, new MaintenanceRule(10000L, 180));
        maintenanceRules.put(MaintenanceType.BRAKE_INSPECTION, new MaintenanceRule(15000L, 365));
        maintenanceRules.put(MaintenanceType.TIRE_ROTATION, new MaintenanceRule(8000L, 180));
        maintenanceRules.put(MaintenanceType.TRANSMISSION_SERVICE, new MaintenanceRule(60000L, 730));
    }

    public static MaintenanceRule getRule(MaintenanceType type) {
        return maintenanceRules.get(type);
    }

    public static Map<MaintenanceType, MaintenanceRule> getAllRules() {
        return maintenanceRules;
    }
}

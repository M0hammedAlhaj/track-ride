package com.example.trackride.Core.MaintenanceRecord.model;

import lombok.Getter;

@Getter
public enum MaintenanceType {
    OIL_CHANGE("تغيير الزيت"),
    TIRE_ROTATION("تدوير الإطارات"),
    BRAKE_INSPECTION("فحص المكابح"),
    TRANSMISSION_SERVICE("خدمة ناقل الحركة");

    private final String arabicName;

    MaintenanceType(String arabicName) {
        this.arabicName = arabicName;
    }

    @Override
    public String toString() {
        return "MaintenanceType{" +
                "arabicName='" + arabicName + '\'' +
                '}';
    }
}

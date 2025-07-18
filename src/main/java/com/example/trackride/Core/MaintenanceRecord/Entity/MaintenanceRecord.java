package com.example.trackride.Core.MaintenanceRecord.Entity;

import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import com.example.trackride.Core.Shared.Base.BaseEntity;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Table(name = "maintenance_records")
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MaintenanceRecord extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "vehicle_id", referencedColumnName = "id")
    private Vehicle vehicle;

    private boolean isNotify;

    @Enumerated(EnumType.STRING)
    private MaintenanceType type;

    private LocalDate reminder;

    private BigDecimal price;

    private String description;

    public void assignVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
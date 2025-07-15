package com.example.trackride.Core.Vehicle.Entity;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.Shared.Base.BaseEntity;
import com.example.trackride.Core.User.Entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.Set;

@Table(name = "Vehicles")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle extends BaseEntity {
    private String license;

    private String model;

    private String color;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "vehicle")
    private Set<MaintenanceRecord> maintenanceRecords;

    public boolean belongsTo(User user) {
        return this.owner.equals(user);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return Objects.equals(license, vehicle.license);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(license);
    }
}

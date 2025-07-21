package com.example.trackride.Core.Vehicle.Entity;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.Shared.Base.BaseEntity;
import com.example.trackride.Core.User.Entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Year;
import java.util.Objects;
import java.util.Set;

@Table(name = "Vehicles")
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SqlResultSetMapping(
        name = "VehicleWithLatestMaintenanceMapping",
        entities = {
                @EntityResult(entityClass = Vehicle.class, fields = {
                        @FieldResult(name = "id", column = "vehicle_id"),
                        @FieldResult(name = "license", column = "vehicle_license"),
                        @FieldResult(name = "model", column = "vehicle_model"),
                        @FieldResult(name = "color", column = "vehicle_color"),
                        @FieldResult(name = "name", column = "vehicle_name"),
                        @FieldResult(name = "year", column = "vehicle_year"),
                        @FieldResult(name = "createdAt", column = "vehicle_created_at"),
                        @FieldResult(name = "updatedAt", column = "vehicle_updated_at")
                }),
                @EntityResult(entityClass = MaintenanceRecord.class, fields = {
                        @FieldResult(name = "id", column = "maintenance_id"),
                        @FieldResult(name = "isNotify", column = "maintenance_is_notify"),
                        @FieldResult(name = "type", column = "maintenance_type"),
                        @FieldResult(name = "reminder", column = "maintenance_reminder"),
                        @FieldResult(name = "price", column = "maintenance_price"),
                        @FieldResult(name = "description", column = "maintenance_description"),
                        @FieldResult(name = "status", column = "maintenance_status"),
                        @FieldResult(name = "createdAt", column = "maintenance_created_at"),
                        @FieldResult(name = "updatedAt", column = "maintenance_updated_at")
                })
        })
public class Vehicle extends BaseEntity {

    private String license;

    private String model;

    private String color;

    private String name;

    private Year year;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
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

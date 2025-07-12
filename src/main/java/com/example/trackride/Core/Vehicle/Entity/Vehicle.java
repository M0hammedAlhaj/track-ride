package com.example.trackride.Core.Vehicle.Entity;

import com.example.trackride.Core.Shared.Base.BaseEntity;
import com.example.trackride.Core.User.Entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

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

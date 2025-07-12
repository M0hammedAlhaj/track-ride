package com.example.trackride.Core.User.Entity;


import com.example.trackride.Core.Shared.Base.BaseEntity;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {
    private String name;

    private String email;

    private String password;

    @OneToMany
    private Set<Vehicle> vehicles;

    public void assignVehicle(Vehicle vehicle) {
        if (this.vehicles == null) {
            this.vehicles = new HashSet<>();
        }
        if(vehicles.contains(vehicle)) {
            return;
        }
        this.vehicles.add(vehicle);
    }
}

package com.example.trackride.Infrastructures.Jpa.Vehicle;

import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class JpaVehicleRepository implements VehicleRepository {
    private final EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public Optional<Vehicle> findById(UUID id) {
        return em.createQuery("SELECT v FROM Vehicle v WHERE v.id=:id ",Vehicle.class)
                .setParameter("id",id)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public Vehicle save(Vehicle entity) {
        em.persist(entity);
        return entity;
    }

    @Override
    public boolean vehicleExistByLicense(String license) {
        return !em.createQuery("SELECT 1 FROM Vehicle v WHERE v.license = :license")
                .setParameter("license", license)
                .setMaxResults(1)
                .getResultList()
                .isEmpty();
    }
}

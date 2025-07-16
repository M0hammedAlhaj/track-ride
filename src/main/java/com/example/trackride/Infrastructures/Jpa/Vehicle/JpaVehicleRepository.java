package com.example.trackride.Infrastructures.Jpa.Vehicle;

import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class JpaVehicleRepository implements VehicleRepository {
    private final EntityManager em;

    @Override
    @Transactional(readOnly = true)
    public Optional<Vehicle> findById(UUID id) {
        return em.createQuery("SELECT v FROM Vehicle v WHERE v.id=:id ", Vehicle.class)
                .setParameter("id", id)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public Vehicle save(Vehicle entity) {
        em.persist(entity);
        return entity;
    }

    @Override
    @Transactional
    public Vehicle update(Vehicle entity) {
        if (em.find(Vehicle.class, entity.getId()) == null) {
            throw new ResourceNotFoundException("Vehicle not found");
        }
        return em.merge(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean vehicleExistByLicense(String license) {
        return !em.createQuery("SELECT 1 FROM Vehicle v WHERE v.license = :license")
                .setParameter("license", license)
                .setMaxResults(1)
                .getResultList()
                .isEmpty();
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Vehicle> findVehiclesByOwnerId(UUID ownerId) {
        return new HashSet<>(em.createQuery("SELECT v FROM Vehicle v WHERE v.owner.id = :ownerId", Vehicle.class)
                .setParameter("ownerId", ownerId)
                .getResultList());
    }

    @Override
    @Transactional(readOnly = true)
    public Vehicle findVehicleByIdWithMaintenanceRecord(UUID vehicleId) {
        return em.createQuery("SELECT v FROM Vehicle v JOIN FETCH v.maintenanceRecords WHERE v.id =:vehicleId ", Vehicle.class)
                .setParameter("vehicleId", vehicleId)
                .getSingleResult();
    }

    @Override
    @Transactional(readOnly = true)
    public Long countVehiclesByOwnerId(UUID ownerId) {
        return em.createQuery("SELECT COUNT(v) FROM Vehicle v WHERE v.owner.id =:ownerId"
                        , Long.class)
                .setParameter("ownerId", ownerId)
                .getSingleResult();
    }

    @Override
    public Optional<Vehicle> findMostRecentVehicleByOwnerId(UUID ownerId) {
        return em.createQuery("SELECT v FROM Vehicle v WHERE v.owner.id =:ownerId order by v.createdAt desc "
                ,Vehicle.class)
                .setParameter("ownerId", ownerId)
                .getResultList().stream().findFirst();
    }
}
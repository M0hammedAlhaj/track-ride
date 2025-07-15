package com.example.trackride.Infrastructures.Jpa.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class JpaMaintenanceRecordRepository implements MaintenanceRecordRepository {
    private final EntityManager em;

    @Override
    @Transactional
    public Optional<MaintenanceRecord> findById(UUID id) {
        return em.createQuery("SELECT m FROM MaintenanceRecord m WHERE m.id=:id", MaintenanceRecord.class)
                .setParameter("id", id)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public MaintenanceRecord save(MaintenanceRecord entity) {
        em.persist(entity);
        return entity;
    }

    @Override
    @Transactional
    public MaintenanceRecord update(MaintenanceRecord entity) {
        MaintenanceRecord existing = em.find(MaintenanceRecord.class, entity.getId());
        if (existing == null) {
            throw new ResourceNotFoundException("MaintenanceRecord with ID " + entity.getId() + " not found.");
        }
        return em.merge(entity);
    }

    @Override
    public Optional<MaintenanceRecord> findLastMaintenanceRecordByVehicleId(UUID vehicleId) {
        return em.createQuery("SELECT m FROM MaintenanceRecord m " +
                        "WHERE m.vehicle.id =:vehicleId " +
                        "ORDER BY m.createdAt desc ", MaintenanceRecord.class)
                .setParameter("vehicleId", vehicleId)
                .getResultList().stream().findFirst();
    }
}

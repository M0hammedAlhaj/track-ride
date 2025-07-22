package com.example.trackride.Infrastructures.Jpa.MaintenanceRecord;

import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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
            throw new ResourceNotFoundException(entity.getId().toString());
        }
        return em.merge(entity);
    }

    @Override
    @Transactional
    public void delete(MaintenanceRecord entity) {
        MaintenanceRecord existing = em.find(MaintenanceRecord.class, entity.getId());
        if (existing == null) {
            throw new ResourceNotFoundException(entity.toString());
        }
        em.remove(existing);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MaintenanceRecord> findLastMaintenanceRecordByVehicleId(UUID vehicleId) {
        return em.createQuery("SELECT m FROM MaintenanceRecord m " +
                              "WHERE m.vehicle.id =:vehicleId " +
                              "ORDER BY m.createdAt desc ", MaintenanceRecord.class)
                .setParameter("vehicleId", vehicleId)
                .getResultList().stream().findFirst();
    }


    @Override
    @Transactional(readOnly = true)
    public Long countFirstUpcomingMaintenanceByOwnerId(UUID ownerId) {
        return em.createQuery("SELECT COUNT(m) FROM MaintenanceRecord m WHERE m.vehicle.owner.id =:ownerId AND m.reminder>: now", Long.class)
                .setParameter("ownerId", ownerId)
                .setParameter("now", LocalDate.now())
                .getSingleResult();
    }

    public List<MaintenanceRecord> findFirstMaintenanceRecordByOwnerIdAndStatus(UUID ownerId,
                                                                                MaintenanceStatus status) {
        return em.createQuery(
                        "SELECT m FROM MaintenanceRecord m " +
                        "WHERE m.reminder = (" +
                        "    SELECT MIN(m2.reminder) FROM MaintenanceRecord m2 " +
                        "    WHERE m2.vehicle.id = m.vehicle.id AND m2.status = :status" +
                        ") " +
                        "AND m.vehicle.owner.id = :ownerId AND m.status = :status ORDER BY m.reminder", MaintenanceRecord.class)
                .setParameter("ownerId", ownerId)
                .setParameter("status", status)
                .setMaxResults(5)
                .getResultList();
    }

    @Override
    public Long countOverdueMaintenanceRecordsByOwnerId(UUID ownerId) {
        return em.createQuery("SELECT COUNT(m) FROM MaintenanceRecord m WHERE m.vehicle.owner.id =:ownerId AND m.status =:status AND m.reminder<:now", Long.class)
                .setParameter("ownerId", ownerId)
                .setParameter("status", MaintenanceStatus.UP_COMING)
                .setParameter("now", LocalDate.now())
                .getSingleResult();
    }

    @Override
    public BigDecimal calculateTotalMaintenanceByOwnerId(UUID ownerId) {
        return em.createQuery("SELECT sum (m.price) FROM MaintenanceRecord m WHERE m.vehicle.owner.id =:ownerId", BigDecimal.class)
                .setParameter("ownerId", ownerId)
                .getSingleResult();
    }

    @Override
    public BigDecimal calculateLastMonthMaintenanceCostByOwnerId(UUID ownerId) {
        LocalDate now = LocalDate.now();
        LocalDate lastMonth = now.minusMonths(1);

        LocalDateTime startOfLastMonth = lastMonth.withDayOfMonth(1).atStartOfDay();

        LocalDateTime endOfLastMonth = lastMonth.withDayOfMonth(lastMonth.lengthOfMonth())
                .atTime(23, 59, 59);


        return em.createQuery(
                        "SELECT COALESCE(SUM(m.price), 0) FROM MaintenanceRecord m " +
                        "WHERE m.vehicle.owner.id = :ownerId " +
                        "AND m.createdAt BETWEEN :startDate AND :endDate", BigDecimal.class)
                .setParameter("ownerId", ownerId)
                .setParameter("startDate", startOfLastMonth)
                .setParameter("endDate", endOfLastMonth)
                .getSingleResult();
    }
}

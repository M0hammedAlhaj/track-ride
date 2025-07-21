package com.example.trackride.Infrastructures.Jpa.Vehicle;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
    @Transactional
    public void delete(Vehicle entity) {
        Vehicle existing = em.find(Vehicle.class, entity.getId());
        if (existing == null) {
            throw new ResourceNotFoundException("Vehicle not found");
        }
        em.remove(existing);
        em.flush();
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
    public Vehicle findVehicleWithMaintenanceRecordById(UUID vehicleId) {
        return em.createQuery("SELECT v FROM Vehicle v LEFT JOIN FETCH v.maintenanceRecords WHERE v.id =:vehicleId ", Vehicle.class)
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
                        , Vehicle.class)
                .setParameter("ownerId", ownerId)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public List<VehicleMaintenanceDTO> findVehiclesWithLatestMaintenanceByOwnerIdAndPagination(UUID ownerId, int page, int size) {
        String sql = """
                    SELECT
                        v.id AS vehicle_id,
                        v.license AS vehicle_license,
                        v.model AS vehicle_model,
                        v.color AS vehicle_color,
                        v.name AS vehicle_name,
                        v.year AS vehicle_year,
                        v.created_at AS vehicle_created_at,
                        v.updated_at AS vehicle_updated_at,
                        v.owner_id As owner_id,
                
                        mr.id AS maintenance_id,
                        mr.is_notify AS maintenance_is_notify,
                        mr.type AS maintenance_type,
                        mr.reminder AS maintenance_reminder,
                        mr.price AS maintenance_price,
                        mr.description AS maintenance_description,
                        mr.status AS maintenance_status,
                        mr.created_at AS maintenance_created_at,
                        mr.updated_at AS maintenance_updated_at,
                        mr.vehicle_id AS maintenance_vehicle_id
                    FROM vehicles v
                    LEFT JOIN LATERAL (
                        SELECT * FROM maintenance_records mr
                        WHERE mr.vehicle_id = v.id
                        ORDER BY mr.created_at DESC
                        LIMIT 1
                    ) mr ON true
                    WHERE v.owner_id = :ownerId
                    ORDER BY v.updated_at DESC
                    LIMIT :limit OFFSET :offset
                """;
        @SuppressWarnings("unchecked")
        List<Object[]> rows  = em.createNativeQuery(sql, "VehicleWithLatestMaintenanceMapping")
                .setParameter("ownerId", ownerId)
                .setParameter("limit", size)
                .setParameter("offset", (page - 1) * size)
                .getResultList();

        return rows.stream()
                .map(row -> {
                    Vehicle vehicle = (Vehicle) row[0];
                    MaintenanceRecord maintenanceRecord = (MaintenanceRecord) row[1];
                    return new VehicleMaintenanceDTO(vehicle, maintenanceRecord);
                })
                .toList();
    }
}

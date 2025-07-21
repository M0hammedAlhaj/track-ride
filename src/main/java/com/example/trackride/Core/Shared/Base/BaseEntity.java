package com.example.trackride.Core.Shared.Base;


import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        if (this instanceof MaintenanceRecord maintenanceRecord) {
            maintenanceRecord.setStatus(MaintenanceStatus.UP_COMING);
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

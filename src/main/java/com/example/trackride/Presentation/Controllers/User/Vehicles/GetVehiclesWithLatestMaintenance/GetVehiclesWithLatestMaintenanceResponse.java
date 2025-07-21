package com.example.trackride.Presentation.Controllers.User.Vehicles.GetVehiclesWithLatestMaintenance;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import lombok.Getter;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class GetVehiclesWithLatestMaintenanceResponse {
    private final VehicleCollection data;
    private final String message;
    private final long totalElements;
    private final int totalPages;
    private final int currentPage;
    private final int size;
    private final boolean first;
    private final boolean last;

    public GetVehiclesWithLatestMaintenanceResponse(List<VehicleMaintenanceDTO> dto, Long totalElements, int currentPage, int size, String message) {
        this.data = new VehicleCollection(dto.stream().map((e) -> {
            Vehicle vehicle = e.vehicle();
            if (e.maintenanceRecord() != null) {
                vehicle.setMaintenanceRecords(Set.of(e.maintenanceRecord()));
            } else {
                vehicle.setMaintenanceRecords(Collections.emptySet());
            }
            return vehicle;
        }).collect(Collectors.toSet()));
        
        this.message = message;
        this.totalElements = totalElements;
        this.totalPages = (int) Math.ceil((double) totalElements / size);
        this.currentPage = currentPage;
        this.size = size;
        this.first = currentPage == 1;
        this.last = currentPage >= this.totalPages;
    }
}


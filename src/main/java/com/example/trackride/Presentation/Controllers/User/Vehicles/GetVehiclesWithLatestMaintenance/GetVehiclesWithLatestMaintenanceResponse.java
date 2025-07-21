package com.example.trackride.Presentation.Controllers.User.Vehicles.GetVehiclesWithLatestMaintenance;

import com.example.trackride.Application.Vehicle.DTO.VehicleMaintenanceDTO;
import com.example.trackride.Presentation.Resources.MaintenanceRecord.MaintenanceRecordCollection;
import com.example.trackride.Presentation.Resources.Vehicle.VehicleCollection;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GetVehiclesWithLatestMaintenanceResponse {
    private VehiclesMaintenance data;

    private String Message;

    public GetVehiclesWithLatestMaintenanceResponse(List<VehicleMaintenanceDTO> dto, String Message) {
        this.data = new VehiclesMaintenance(dto);
        this.Message = Message;
    }
}

@Getter
class VehiclesMaintenance {
    private final VehicleCollection vehicleCollection;
    private final MaintenanceRecordCollection maintenanceRecordCollection;

    public VehiclesMaintenance(List<VehicleMaintenanceDTO> dtos) {
        vehicleCollection = new VehicleCollection(dtos.stream().map(VehicleMaintenanceDTO::vehicle)
                .collect(Collectors.toUnmodifiableSet()));
        maintenanceRecordCollection = new MaintenanceRecordCollection(dtos.stream().map(VehicleMaintenanceDTO::maintenanceRecord)
                .toList());
    }
}


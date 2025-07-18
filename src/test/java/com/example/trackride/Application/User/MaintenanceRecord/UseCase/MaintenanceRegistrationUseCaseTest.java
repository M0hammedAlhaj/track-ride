package com.example.trackride.Application.User.MaintenanceRecord.UseCase;

import com.example.trackride.Application.MaintenanceRecord.DTO.MaintenanceRecordRegistrationDTO;
import com.example.trackride.Application.MaintenanceRecord.UseCase.MaintenanceRegistrationUseCase;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Core.MaintenanceRecord.Factory.MaintenanceRecordFactory;
import com.example.trackride.Core.MaintenanceRecord.Repository.MaintenanceRecordRepository;
import com.example.trackride.Core.MaintenanceRecord.model.MaintenanceType;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MaintenanceRegistrationUseCaseTest {
    @Mock
    MaintenanceRecordRepository maintenanceRecordRepository;

    @Mock
    MaintenanceRecordFactory factory;

    @Mock
    VehicleRepository vehicleRepository;

    @Mock
    UserRepository userRepository;

    @InjectMocks
    MaintenanceRegistrationUseCase useCase;

    @Test
    public void user_should_register_maintenance_record_successfully() {
        UUID userId = UUID.randomUUID();
        UUID vehicleId = UUID.randomUUID();
        MaintenanceType type = MaintenanceType.TIRE_ROTATION;
        String description = "description";
        LocalDate reminder = LocalDate.now().plusDays(30);
        BigDecimal price = BigDecimal.valueOf(30);

        MaintenanceRecordRegistrationDTO dto = new MaintenanceRecordRegistrationDTO(
                vehicleId.toString(),
                type,
                description,
                price,
                reminder,
                userId.toString()
        );

        MaintenanceRecord maintenanceRecord = Mockito.mock(MaintenanceRecord.class);
        User user = new User();
        Vehicle vehicle = Mockito.mock(Vehicle.class);

        when(factory.create(type, reminder, description, price)).thenReturn(maintenanceRecord);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));
        when(vehicle.belongsTo(user)).thenReturn(true);
        when(maintenanceRecordRepository.save(maintenanceRecord)).thenReturn(maintenanceRecord);

        MaintenanceRecord result = useCase.execute(dto);

        Mockito.verify(maintenanceRecord).assignVehicle(vehicle);
        Mockito.verify(maintenanceRecordRepository).save(maintenanceRecord);
        assertEquals(maintenanceRecord, result);
    }

    @Test
    public void user_should_register_maintenance_record_throw_exception_() {
        UUID userId = UUID.randomUUID();
        UUID vehicleId = UUID.randomUUID();
        MaintenanceType type = MaintenanceType.TIRE_ROTATION;
        String description = "description";
        LocalDate reminder = LocalDate.now().plusDays(30);
        BigDecimal price = BigDecimal.valueOf(30);

        MaintenanceRecordRegistrationDTO dto = new MaintenanceRecordRegistrationDTO(
                vehicleId.toString(),
                type,
                description,
                price,
                reminder,
                userId.toString()
        );

        Vehicle vehicle = Mockito.mock(Vehicle.class);
        User user = new User();
        when(factory.create(type, reminder, description, price)).thenReturn(new MaintenanceRecord());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(vehicleRepository.findById(vehicleId)).thenReturn(Optional.of(vehicle));
        when(vehicle.belongsTo(user)).thenReturn(false);

        Assertions.assertThrows(UserAccessException.class, () ->
                useCase.execute(dto));
    }
}
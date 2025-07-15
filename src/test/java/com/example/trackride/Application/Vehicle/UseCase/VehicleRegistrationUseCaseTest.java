package com.example.trackride.Application.Vehicle.UseCase;

import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Core.Shared.Exception.DuplicateResourceException;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import com.example.trackride.Core.Vehicle.Factory.VehicleFactory;
import com.example.trackride.Core.Vehicle.Repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VehicleRegistrationUseCaseTest {

    @Mock
    VehicleRepository vehicleRepository;

    @Mock
    VehicleFactory vehicleFactory;

    @InjectMocks
    VehicleRegistrationUseCase underTest;

    @Test
    void should_register_vehicle_successfully() {
        String license = "ABC123";
        String model = "Tesla";
        String color = "Black";
        String year = "1990";
        String name = "U2";
        VehicleRegistrationDTO dto = new VehicleRegistrationDTO(license, model, color, year, name);

        Vehicle expectedVehicle = Vehicle.builder()
                .license(license)
                .model(model)
                .color(color)
                .build();
        expectedVehicle.setId(UUID.randomUUID());

        when(vehicleRepository.vehicleExistByLicense(license)).thenReturn(false);
        when(vehicleFactory.create(license, model, color, year, name)).thenReturn(expectedVehicle);

        Vehicle registeredVehicle = underTest.execute(dto);

        assertThat(registeredVehicle).isEqualTo(expectedVehicle);
        verify(vehicleRepository).vehicleExistByLicense(license);
        verify(vehicleFactory).create(license, model, color, year, name);
        verify(vehicleRepository).save(expectedVehicle);
    }

    @Test
    void should_throw_exception_when_license_already_exists() {
        String license = "DUPLICATE123";
        String model = "BMW";
        String color = "Red";
        String year = "1990";
        String name = "e200";
        VehicleRegistrationDTO dto = new VehicleRegistrationDTO(license, model, color,year, name);

        when(vehicleRepository.vehicleExistByLicense(license)).thenReturn(true);

        assertThatThrownBy(() -> underTest.execute(dto))
                .isInstanceOf(DuplicateResourceException.class)
                .hasMessageContaining("Vehicle with license '" + license + "' already exists.");

        verify(vehicleFactory, never()).create(any(), any(), any(),any(),any());
        verify(vehicleRepository, never()).save(any());
    }
}
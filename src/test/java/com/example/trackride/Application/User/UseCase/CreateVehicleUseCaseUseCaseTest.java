package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserCreateVehicleDTO;
import com.example.trackride.Application.Vehicle.DTO.VehicleRegistrationDTO;
import com.example.trackride.Application.Vehicle.UseCase.VehicleRegistrationUseCase;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.Vehicle.Entity.Vehicle;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateVehicleUseCaseUseCaseTest {

    @Mock
    UserRepository userRepository;

    @Mock
    VehicleRegistrationUseCase vehicleRegistrationUseCase;

    @InjectMocks
    CreateVehicleUseCase underTest;

    @Test
    public void user_assign_new_vehicle_successful() {
        UUID id = UUID.randomUUID();
        String license = "license";
        String model = "model";
        String color = "color";
        String year = "2012";
        String name = "name";
        UserCreateVehicleDTO userCreateVehicleDTO =
                new UserCreateVehicleDTO(id, license, model, color, year, name);

        User user = new User();
        user.setId(id);

        Vehicle vehicle = Vehicle.builder()
                .license(license)
                .model(model)
                .color(color)
                .build();

        when(userRepository.findById(user.getId()))
                .thenReturn(Optional.of(user));

        when(vehicleRegistrationUseCase.execute(any(VehicleRegistrationDTO.class)))
                .thenReturn(vehicle);

        when(userRepository.update(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        vehicle = underTest.execute(userCreateVehicleDTO);

        assertThat(user.getVehicles()).hasSize(1);
        assertThat(user.getVehicles()).containsExactly(vehicle);
    }

    @Test
    public void should_throw_exception_when_user_not_found() {
        UUID id = UUID.randomUUID();
        String license = "ABC123";
        String model = "Tesla";
        String color = "Black";
        String year = "2012";
        String name = "name";

        UserCreateVehicleDTO dto = new UserCreateVehicleDTO(
                id, license, model, color, year, name);

        when(userRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> underTest.execute(dto))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("User not found By " + id);

        verify(vehicleRegistrationUseCase, never()).execute(any());
        verify(userRepository, never()).update(any());
    }
}
package com.example.trackride.Application.User.DTO;

import java.util.UUID;

public record UserCreateVehicleDTO(UUID id ,
                                   String license,
                                   String model,
                                   String color,
                                   String year,
                                   String name) {
}

package com.example.trackride.Presentation.Controllers.User.AssignVehicle;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AssignVehicleRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String license;

    @NotBlank
    private String model;

    @NotBlank
    private String color;

    @NotBlank
    @Pattern(regexp = "^(19|20)\\d{2}$", message = "Year must be between 1900 and 2099")
    private String year;
}

package com.example.trackride.Presentation.Controllers.MaintenanceRecord.CalculateTotalMaintenanceCost;

import com.example.trackride.Application.MaintenanceRecord.UseCase.CalculateTotalMaintenanceCostUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.MaintenanceRecord.MaintenanceBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(MaintenanceBaseController.Maintenance_BASE_API)
@RequiredArgsConstructor
public class CalculateTotalMaintenanceCostController {

    private final CalculateTotalMaintenanceCostUseCase useCase;

    @GetMapping("/total-cost")
    public ResponseEntity<CalculateTotalMaintenanceCostResponse> invoke(@AuthenticationPrincipal UserAuthentication authentication) {
        var id = UUID.fromString(authentication.getId());

        return ResponseEntity.ok(new CalculateTotalMaintenanceCostResponse(useCase.execute(id), "Retrieve Successful"));
    }
}

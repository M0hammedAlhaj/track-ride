package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetOwnerMaintenanceCostForLastMonth;

import com.example.trackride.Application.MaintenanceRecord.UseCase.GetOwnerMaintenanceCostForLastMonth;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.MaintenanceRecord.CostResponse;
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
public class GetOwnerMaintenanceCostForLastMonthController {
    private final GetOwnerMaintenanceCostForLastMonth useCase;

    @GetMapping("/last-month-cost")
    public ResponseEntity<CostResponse> invoke(@AuthenticationPrincipal UserAuthentication userAuthentication) {
        var id = UUID.fromString(userAuthentication.getId());
        return ResponseEntity.ok(new CostResponse(useCase.execute(id), "Retrieve Successful"));
    }
}

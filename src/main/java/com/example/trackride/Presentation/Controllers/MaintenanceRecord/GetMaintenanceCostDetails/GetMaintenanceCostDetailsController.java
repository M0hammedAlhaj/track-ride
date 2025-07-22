package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetMaintenanceCostDetails;

import com.example.trackride.Application.MaintenanceRecord.UseCase.GetMaintenanceCostDetailsUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.MaintenanceRecord.MaintenanceBaseController;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(MaintenanceBaseController.Maintenance_BASE_API)
@AllArgsConstructor
public class GetMaintenanceCostDetailsController {
    private final GetMaintenanceCostDetailsUseCase useCase;

    @GetMapping("cost-details")
    public ResponseEntity<GetMaintenanceCostDetailsResponse> invoke(@AuthenticationPrincipal UserAuthentication authentication) {
        var id = UUID.fromString(authentication.getId());
        return ResponseEntity.ok(new GetMaintenanceCostDetailsResponse(useCase.execute(id), "Retrieve cost details Successful"));
    }
}

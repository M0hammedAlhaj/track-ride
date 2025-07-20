package com.example.trackride.Presentation.Controllers.MaintenanceRecord.FetchUpcomingMaintenanceRecord;

import com.example.trackride.Application.MaintenanceRecord.UseCase.CountUpcomingMaintenanceRecordUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.MaintenanceRecord.MaintenanceBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(MaintenanceBaseController.Maintenance_BASE_API)
@RequiredArgsConstructor
public class CountUpcomingMaintenanceRecordController {
    private final CountUpcomingMaintenanceRecordUseCase useCase;

    @GetMapping("up-coming")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication userAuthentication) {
        return CountUpcomingMaintenanceRecordResponse.success(useCase.execute(userAuthentication.getId()));
    }
}

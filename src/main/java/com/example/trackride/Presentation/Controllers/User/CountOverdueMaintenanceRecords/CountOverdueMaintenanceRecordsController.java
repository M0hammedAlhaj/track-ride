package com.example.trackride.Presentation.Controllers.User.CountOverdueMaintenanceRecords;

import com.example.trackride.Application.MaintenanceRecord.DTO.CountOverdueMaintenanceRecordsDTO;
import com.example.trackride.Application.MaintenanceRecord.UseCase.CountOverdueMaintenanceRecordsUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class CountOverdueMaintenanceRecordsController {

    private final CountOverdueMaintenanceRecordsUseCase useCase;

    @GetMapping("/maintenance-record/count-overdue")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication userAuthentication) {
        Long count = useCase.execute(new CountOverdueMaintenanceRecordsDTO(UUID.fromString(userAuthentication.getId())));
        return ResponseEntity.ok(new CountOverdueMaintenanceRecordsResponse(count, "Request executed successfully"));
    }
}

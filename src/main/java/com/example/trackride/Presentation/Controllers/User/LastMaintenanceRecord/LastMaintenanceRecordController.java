package com.example.trackride.Presentation.Controllers.User.LastMaintenanceRecord;

import com.example.trackride.Application.MaintenanceRecord.UseCase.LastMaintenanceRecordUseCase;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@RequiredArgsConstructor
public class LastMaintenanceRecordController {

    private final LastMaintenanceRecordUseCase useCase;

    @GetMapping("/last-Maintenance")
    public ResponseEntity<?> invoke(@AuthenticationPrincipal UserAuthentication user) {
        return LastMaintenanceRecordResponse.success(useCase.execute(user.getId()));
    }
}

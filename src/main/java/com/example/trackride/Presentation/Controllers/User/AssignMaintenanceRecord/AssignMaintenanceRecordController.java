package com.example.trackride.Presentation.Controllers.User.AssignMaintenanceRecord;

import com.example.trackride.Application.User.MaintenanceRecord.DTO.MaintenanceRecordRegistrationDTO;
import com.example.trackride.Application.User.MaintenanceRecord.UseCase.MaintenanceRegistrationUseCase;
import com.example.trackride.Core.MaintenanceRecord.Entity.MaintenanceRecord;
import com.example.trackride.Infrastructures.Security.Auth.UserAuthentication;
import com.example.trackride.Presentation.Controllers.User.UserBaseController;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UserBaseController.USER_API_BASE)
@AllArgsConstructor
public class AssignMaintenanceRecordController {
    private final MaintenanceRegistrationUseCase maintenanceRegistrationUseCase;

    @PostMapping("/assign-maintenance")
    public ResponseEntity<?> invoke(@RequestBody AssignMaintenanceRecordRequest request,
                                    @AuthenticationPrincipal UserAuthentication userAuthentication) {

        MaintenanceRecord maintenanceRecord = maintenanceRegistrationUseCase.execute(new MaintenanceRecordRegistrationDTO(request.getVehicleId(),
                request.getType(), userAuthentication.getId()));

        return AssignMaintenanceRecordResponse.success(maintenanceRecord);
    }
}

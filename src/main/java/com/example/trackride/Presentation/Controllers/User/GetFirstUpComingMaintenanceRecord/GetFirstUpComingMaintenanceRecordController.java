package com.example.trackride.Presentation.Controllers.User.GetFirstUpComingMaintenanceRecord;

import com.example.trackride.Application.MaintenanceRecord.DTO.GetFirstUpComingMaintenanceRecordDTO;
import com.example.trackride.Application.MaintenanceRecord.UseCase.GetFirstUpComingMaintenanceRecordUseCase;
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
public class GetFirstUpComingMaintenanceRecordController {

    private final GetFirstUpComingMaintenanceRecordUseCase useCase;

    @GetMapping("/maintenance-record/first-upcoming")
    public ResponseEntity<GetFirstUpComingMaintenanceRecordResponse> getFirstUpComingMaintenanceRecord(@AuthenticationPrincipal UserAuthentication authentication) {

        var list = useCase.execute(new GetFirstUpComingMaintenanceRecordDTO(UUID.fromString(authentication.getId())));
        return ResponseEntity.ok(new GetFirstUpComingMaintenanceRecordResponse(list, "Retrieve Data Successfully!"));
    }
}

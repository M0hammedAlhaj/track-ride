package com.example.trackride.Presentation.Controllers.MaintenanceRecord.GetAllMaintenanceType;

import com.example.trackride.Presentation.Controllers.MaintenanceRecord.MaintenanceBaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(MaintenanceBaseController.Maintenance_BASE_API)
public class GetAllMaintenanceTypeController {

    @GetMapping("/types")
    public ResponseEntity<?> invoke() {

        return ResponseEntity.ok(new GetAllMaintenanceTypeResponse());
    }
}

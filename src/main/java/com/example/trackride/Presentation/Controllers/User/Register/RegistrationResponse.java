package com.example.trackride.Presentation.Controllers.User.Register;

import com.example.trackride.Core.User.Entity.User;
import lombok.Data;

@Data
public class RegistrationResponse {

    private String uuid;

    private String name;

    private String email;

    public RegistrationResponse(User user) {
        this.uuid = user.getId().toString();
        this.name = user.getName();
        this.email = user.getEmail();

    }
}

package com.example.trackride.Presentation.Resources;

import com.example.trackride.Core.User.Entity.User;
import lombok.Getter;

@Getter
public class UserResources {

    private final String uuid;

    private final String email;

    private final String name;

    public UserResources(User user) {
        this.uuid = user.getId().toString();
        this.email = user.getEmail();
        this.name = user.getName();
    }
}

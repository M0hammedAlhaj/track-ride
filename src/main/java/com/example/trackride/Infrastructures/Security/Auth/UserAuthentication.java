package com.example.trackride.Infrastructures.Security.Auth;

import com.example.trackride.Core.User.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;


public class UserAuthentication implements UserDetails {

    private final User user;

    public UserAuthentication(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    public String getId() { return user.getId().toString(); }

    public UUID getUuid() {
        return user.getId();
    }
}

package com.example.trackride.Core.User.Factory;

import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Service.PasswordEncryptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFactory {

    private final PasswordEncryptor passwordEncryptor;


    public User create(String email, String password, String name) {
        return User.builder()
                .email(email)
                .password(passwordEncryptor.hash(password))
                .name(name)
                .build();
    }
}

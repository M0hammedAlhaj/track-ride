package com.example.trackride.Core.User.Exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(UUID uuid) {
        super("User not found with ID: " + uuid);
    }

    public UserNotFoundException(String email) {
        super("User not found with email: " + email);
    }

}

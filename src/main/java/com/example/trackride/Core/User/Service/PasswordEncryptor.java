package com.example.trackride.Core.User.Service;

public interface PasswordEncryptor {
    String hash(String rawPassword);

    boolean matches(String rawPassword, String encodedPassword);
}

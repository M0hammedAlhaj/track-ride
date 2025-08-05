package com.example.trackride.Core.Shared.Exception;

import java.util.UUID;

public class ResourceNotFoundException extends RuntimeException {


    public ResourceNotFoundException(String key) {
        super("Resource not found by : " + key);
    }
    public ResourceNotFoundException(UUID id) {
        super("Resource not found by : " + id);
    }
}

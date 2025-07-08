package com.example.trackride.Core.Shared.Exception;

public class ResourceNotFoundException extends RuntimeException {


    public ResourceNotFoundException(String key) {
        super("Resource not found by : " + key);
    }
}

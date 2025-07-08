package com.example.trackride.Application.User.Event;

import lombok.Getter;

import java.util.UUID;

public record UserRegisteredEvent(UUID userId, String email) {

}

package com.example.trackride.Application.User.Event;

import java.util.UUID;

public record UserRegisteredEvent(UUID userId, String email) {

}

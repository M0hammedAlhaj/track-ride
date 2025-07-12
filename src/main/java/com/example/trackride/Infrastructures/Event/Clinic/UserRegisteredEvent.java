package com.example.trackride.Infrastructures.Event.Clinic;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class UserRegisteredEvent {
    @EventListener
    public void handle(com.example.trackride.Application.User.Event.UserRegisteredEvent event) {
        System.out.println("📧 Send welcome email to " + event.email());
        System.out.println("📧 UUId :  " + event.userId());
    }
}
package com.example.trackride.Application.User.UseCase;


import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.Event.UserRegisteredEvent;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Factory.UserFactory;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationUseCase {

    private final UserRepository userRepository;
    private final UserFactory userFactory;
    private final ApplicationEventPublisher publisher;

    public User execute(UserRegistrationDTO dto) {
        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new UserAccessException("Email already in use");
        }

        User user = userFactory.create(dto.email(),
                dto.password(),
                dto.name());

        User userSaved = userRepository.save(user);

        publisher.publishEvent(new UserRegisteredEvent(userSaved.getId(), userSaved.getEmail()));

        return userSaved;
    }
}

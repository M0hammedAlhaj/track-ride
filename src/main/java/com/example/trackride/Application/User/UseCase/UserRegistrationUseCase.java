package com.example.trackride.Application.User.UseCase;


import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Factory.UserFactory;
import com.example.trackride.Core.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationUseCase {

    private final UserRepository userRepository;
    private final UserFactory userFactory;

    public User execute(UserRegistrationDTO dto) {
        User user = userFactory.create(dto.email(),
                dto.password(),
                dto.name());
        return userRepository.save(user)
                .orElseThrow();
    }

}

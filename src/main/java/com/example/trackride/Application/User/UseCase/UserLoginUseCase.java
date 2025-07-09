package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserLoginDTO;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.User.Service.PasswordEncryptor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLoginUseCase {

    private final UserRepository userRepository;
    private final PasswordEncryptor passwordEncryptor;

    public User execute(UserLoginDTO userLoginDTO) {
        User user = userRepository.findByEmailOrThrow(userLoginDTO.email());
        if (!passwordEncryptor.matches(userLoginDTO.password(), user.getPassword())) {
            throw new UserAccessException("Password does not match");
        }
        return user;
    }
}

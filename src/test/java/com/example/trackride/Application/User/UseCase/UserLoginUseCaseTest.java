package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserLoginDTO;
import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Exception.Auth.UserAccessException;
import com.example.trackride.Core.User.Repository.UserRepository;
import com.example.trackride.Core.User.Service.PasswordEncryptor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserLoginUseCaseTest {

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncryptor passwordEncryptor;

    @InjectMocks
    UserLoginUseCase underTest;


    static UserLoginDTO createDto() {
        return new UserLoginDTO("example@gmail.com", "123456");
    }

    @Test
    public void user_login_should_login_secsessful() {
        User user = User.builder().name("example")
                .email("example@gmail.com")
                .password("hashed").build();

        when(userRepository.findByEmailOrThrow("example@gmail.com"))
                .thenReturn(user);

        when(passwordEncryptor.matches("123456", "hashed")).thenReturn(true);

        assertThatCode(() -> underTest.execute(createDto()))
                .doesNotThrowAnyException();
    }

    @Test
    public void user_login_email_not_found() {
        String email = "example@gmail.com";

        when(userRepository.findByEmailOrThrow(email))
                .thenThrow(new ResourceNotFoundException(email));

        assertThrows(ResourceNotFoundException.class, () -> {
            underTest.execute(createDto());
        });
    }

    @Test
    public void user_login_password_does_not_match() {
        User user = User.builder().name("example")
                .email("example@gmail.com")
                .password("hashed").build();

        when(userRepository.findByEmailOrThrow("example@gmail.com"))
                .thenReturn(user);

        when(passwordEncryptor.matches("123456", "hashed"))
                .thenReturn(false);

        assertThrows(UserAccessException.class,()->{
            underTest.execute(createDto());
        });
    }
}
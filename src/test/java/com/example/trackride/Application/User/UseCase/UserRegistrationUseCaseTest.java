package com.example.trackride.Application.User.UseCase;

import com.example.trackride.Application.User.DTO.UserRegistrationDTO;
import com.example.trackride.Application.User.Event.UserRegisteredEvent;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Factory.UserFactory;
import com.example.trackride.Core.User.Repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserRegistrationUseCaseTest {

    @InjectMocks
    private UserRegistrationUseCase userRegistrationUseCase;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserFactory userFactory;

    @Mock
    private ApplicationEventPublisher publisher;

    @Test
    void client_can_register_successfully() {
        // Arrange
        UserRegistrationDTO dto = new UserRegistrationDTO(
                "mohammedalhaj@gmail.com",
                "Strong123",
                "mohammedalhaj"
        );

        // Simulate that the factory creates a User without ID (as before DB save)
        User userBeforeSave = User.builder()
                .email(dto.email())
                .name(dto.name())
                .password("hashed_password")
                .build();

        // Simulate that the DB assigns an ID and timestamp when saving
        UUID userIdFromDb = UUID.randomUUID();

        User userAfterSave = User.builder()
                .email(dto.email())
                .name(dto.name())
                .password("hashed_password")
                .build();
        userAfterSave.setId(userIdFromDb);
        userAfterSave.setCreatedAt(LocalDateTime.now());

        when(userRepository.findByEmail(dto.email())).thenReturn(Optional.empty());
        when(userFactory.create(dto.email(), dto.password(), dto.name())).thenReturn(userBeforeSave);
        when(userRepository.save(userBeforeSave)).thenReturn(userAfterSave);

        // Act
        User user = userRegistrationUseCase.execute(dto);

        // Assert
        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo(userIdFromDb);
        assertThat(user.getEmail()).isEqualTo(dto.email());
        assertThat(user.getPassword()).isEqualTo("hashed_password");
        assertThat(user.getName()).isEqualTo(dto.name());
        assertThat(user.getCreatedAt()).isNotNull();

        verify(userRepository).findByEmail(dto.email());
        verify(userFactory).create(dto.email(), dto.password(), dto.name());
        verify(userRepository).save(any(User.class));

        ArgumentCaptor<UserRegisteredEvent> captor = ArgumentCaptor.forClass(UserRegisteredEvent.class);
        verify(publisher).publishEvent(captor.capture());

        UserRegisteredEvent event = captor.getValue();
        assertThat(event.userId()).isEqualTo(user.getId());
        assertThat(event.email()).isEqualTo(user.getEmail());
    }

    @Test
    void throws_when_email_already_exists() {
        // Arrange
        UserRegistrationDTO dto = new UserRegistrationDTO(
                "mohammedalhaj@gmail.com",
                "Strong123",
                "mohammedalhaj"
        );

        User existingUser = User.builder()
                .email(dto.email())
                .name("Existing User")
                .password("hashed_password")
                .build();

        when(userRepository.findByEmail(dto.email())).thenReturn(Optional.of(existingUser));

        // Act & Assert
        RuntimeException exception = Assertions.assertThrows(RuntimeException.class, () -> {
            userRegistrationUseCase.execute(dto);
        });

        assertThat(exception.getMessage()).isEqualTo("Email already in use");

        verify(userRepository, never()).save(any());
        verify(publisher, never()).publishEvent(any());
    }
}

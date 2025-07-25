package com.example.trackride.Core.User.Repository;

import com.example.trackride.Core.Shared.Base.BaseRepository;
import com.example.trackride.Core.User.Entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends BaseRepository<User> {
    Optional<User> findByEmail(String email);

    User findByEmailOrThrow(String email);

    Optional<User> findUserByIdWithVehicles(UUID userId);

    boolean existByEmail(String email);

    boolean existById(UUID id);
}

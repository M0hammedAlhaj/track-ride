package com.example.trackride.Core.User.Repository;

import com.example.trackride.Core.Shared.Base.BaseRepository;
import com.example.trackride.Core.User.Entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends BaseRepository<User> {

    Optional<User> findByEmail(String email);

    Optional<User> findById(UUID id);

    User findByEmailOrThrow(String email) throws UsernameNotFoundException;
    
}

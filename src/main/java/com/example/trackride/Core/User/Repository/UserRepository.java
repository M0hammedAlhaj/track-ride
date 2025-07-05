package com.example.trackride.Core.User.Repository;

import com.example.trackride.Core.Shared.BaseRepository;
import com.example.trackride.Core.User.Entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface UserRepository extends BaseRepository<User> {

    Optional<User> findByEmail(String email);

    User findByEmailOrThrow(String email) throws UsernameNotFoundException;
}

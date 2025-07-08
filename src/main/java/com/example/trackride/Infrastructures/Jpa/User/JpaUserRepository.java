package com.example.trackride.Infrastructures.Jpa.User;

import com.example.trackride.Core.Shared.Exception.ResourceNotFoundException;
import com.example.trackride.Core.User.Entity.User;
import com.example.trackride.Core.User.Repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class JpaUserRepository implements UserRepository {

    private final EntityManager entityManager;

    @Override
    @Transactional
    public Optional<User> findByEmail(String email) {
        return entityManager.
                createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                .setParameter("email", email)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public User findByEmailOrThrow(String email) {
        return findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(email));
    }

    @Override
    @Transactional
    public Optional<User> findById(UUID id) {
        return entityManager.createQuery("SELECT u FROM User u where u.id=:id", User.class)
                .setParameter("id", id)
                .getResultList().stream().findFirst();
    }

    @Override
    @Transactional
    public User save(User entity) {
        entityManager.persist(entity);
        return entity;
    }


}

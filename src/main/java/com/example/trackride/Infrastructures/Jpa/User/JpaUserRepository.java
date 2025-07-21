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
    public Optional<User> findUserByIdWithVehicles(UUID userId) {
        return entityManager.createQuery("SELECT u FROM User u LEFT JOIN FETCH u.vehicles WHERE u.id =: userId",
                        User.class)
                .setParameter("userId", userId)
                .getResultList()
                .stream().findFirst();
    }

    @Override
    public boolean existByEmail(String email) {
        return !entityManager.createQuery(
                        "SELECT 1 FROM User u WHERE u.email = :email", Integer.class)
                .setParameter("email", email)
                .setMaxResults(1)
                .getResultList()
                .isEmpty();
    }

    @Override
    public boolean existById(UUID id) {
        return !entityManager.createQuery(
                        "SELECT 1 FROM User u WHERE u.id = :id", Integer.class)
                .setParameter("id", id)
                .setMaxResults(1)
                .getResultList()
                .isEmpty();
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

    @Override
    @Transactional
    public User update(User entity) {
        if (entityManager.find(User.class, entity.getId()) == null) {
            throw new ResourceNotFoundException(entity.getEmail());
        }
        return entityManager.merge(entity);
    }

    @Override
    @Transactional
    public void delete(User entity) {
        User existing = entityManager.find(User.class, entity.getId());
        if (existing == null) {
            throw new ResourceNotFoundException(entity.toString());
        }
        entityManager.remove(existing);
    }
}

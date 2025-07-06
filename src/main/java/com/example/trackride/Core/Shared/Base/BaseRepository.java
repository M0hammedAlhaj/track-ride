package com.example.trackride.Core.Shared.Base;

import java.util.Optional;
import java.util.UUID;

public interface BaseRepository<T> {


    Optional<T> findById(UUID id);


    void save(T entity);


}

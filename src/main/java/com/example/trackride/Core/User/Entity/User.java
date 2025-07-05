package com.example.trackride.Core.User.Entity;


import com.example.trackride.Core.Shared.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    private String name;

    private String email;

    private String password;

}

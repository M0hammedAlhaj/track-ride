package com.example.trackride.Core.User.Entity;


import com.example.trackride.Core.Shared.Base.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User extends BaseEntity {

    private String name;

    private String email;

    private String password;

}

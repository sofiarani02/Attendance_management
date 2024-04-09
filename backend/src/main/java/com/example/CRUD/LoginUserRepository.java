// LoginUserRepository.java
package com.example.CRUD;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoginUserRepository extends JpaRepository<LoginUser, Long> {
    Optional<LoginUser> findByEmailAndPassword(String email, String password);
}

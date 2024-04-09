// UserRepository.java
package com.example.CRUD;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    // Add the following method
    Optional<User> findByEmailAndPassword(String email, String password);
}

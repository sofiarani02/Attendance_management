package com.example.CRUD;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Query method to find records by email
    List<Admin> findByEmail(String email);

    // Custom query method to find all records except admin login records
    @Query("SELECT a FROM Admin a WHERE a.email <> ?1")
    List<Admin> findAllExceptAdmin(String adminEmail);
}

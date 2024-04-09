package com.example.CRUD;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getEmployeesByEmail(@RequestParam String email) {
        List<Admin> admins = adminRepository.findByEmail(email);
        List<Employee> employees = admins.stream()
                .map(admin -> new Employee(
                        admin.getId(),
                        admin.getUsername(),
                        admin.getEmail(),
                        admin.getDate(),
                        admin.getTime()
                ))
                .collect(Collectors.toList());

        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
}

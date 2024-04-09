package com.example.CRUD;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to fetch admin login records
    @GetMapping("/admin")
    public ResponseEntity<List<Admin>> getAdminLoginRecords() {
        // Fetch records associated with admin email
        List<Admin> admins = adminRepository.findByEmail("admin@gmail.com");
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    // Endpoint to fetch user login records
    @GetMapping("/admin/users")
    public ResponseEntity<List<Admin>> getUserLoginRecords() {
        // Fetch all records except admin login records
        List<Admin> users = adminRepository.findAllExceptAdmin("admin@gmail.com");
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    // Endpoint to fetch login entries for a specific user
    @GetMapping("/admin/users/attendance")
    public ResponseEntity<List<Admin>> getUserLoginEntries(@RequestParam String email) {
        // Fetch login entries for the specified user email
        List<Admin> loginEntries = adminRepository.findByEmail(email);
        return new ResponseEntity<>(loginEntries, HttpStatus.OK);
    }
    // New endpoint to fetch list of users from sign-up form
    @GetMapping("/userList")
    public ResponseEntity<List<User>> getUserList() {
        List<User> userList = userRepository.findAll();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
}

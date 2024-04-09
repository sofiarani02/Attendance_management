package com.example.CRUD;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private LoginUserRepository loginUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private StorageService storageService;

    @PostMapping("/users/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (!userService.isUsernameUnique(user.getUsername())) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }
        if (!userService.isEmailUnique(user.getEmail())) {
            return new ResponseEntity<>("Email is already registered", HttpStatus.BAD_REQUEST);
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/users/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginUser loginUser) {
        Optional<User> userOptional = userRepository.findByEmailAndPassword(
                loginUser.getEmail(),
                loginUser.getPassword()
        );

        if (userOptional.isPresent()) {
            // Save login information
            LoginUser loginEntity = new LoginUser(loginUser.getEmail(), loginUser.getPassword());
            loginUserRepository.save(loginEntity);

            // Save admin login information
            Date loginDate = new Date();
            Admin admin = new Admin(userOptional.get().getUsername(), loginUser.getEmail(), new java.sql.Date(loginDate.getTime()), new java.sql.Time(loginDate.getTime()));
            adminRepository.save(admin);

            String token = jwtTokenService.generateToken(loginUser.getEmail(), userOptional.get().getUsername());

            // Decode token to get issued date and expiration date
            Claims claims = Jwts.parser().setSigningKey(jwtTokenService.getSecret()).parseClaimsJws(token).getBody();
            Date issuedAt = claims.getIssuedAt();
            Date expirationDate = claims.getExpiration();

            // Check if the token is valid
            boolean isValid = expirationDate.after(new Date());

            // Fetch phone number based on the email in the token
            String email = loginUser.getEmail();
            Optional<User> userByEmail = userRepository.findByEmail(email);
            String phoneNumber = userByEmail.isPresent() ? userByEmail.get().getPhone() : "";

            // Return the token along with other details including phone number
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "token", token,
                    "issuedAt", issuedAt.toString(),
                    "expirationDate", expirationDate.toString(),
                    "isValid", String.valueOf(isValid),
                    "phoneNumber", phoneNumber,  // Include phone number in the response
                    "message", "Login successful!"
            ));
        } else {
            return new ResponseEntity<>(Map.of("status", "error", "message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/users/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request) {
        // Fetch user by email
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            // Update username and password if provided
            User user = userOptional.get();
            if (request.getNewUsername() != null) {
                user.setUsername(request.getNewUsername());
            }
            if (request.getNewPassword() != null) {
                user.setPassword(request.getNewPassword());
            }
            userRepository.save(user);
            return ResponseEntity.ok("Profile updated successfully!");
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/image/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("profilePicture") MultipartFile file) {
        try {
            String uploadImage = storageService.uploadImage(file);
            return ResponseEntity.ok(uploadImage);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image");
        }
    }
}

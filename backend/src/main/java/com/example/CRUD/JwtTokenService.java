package com.example.CRUD;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenService {

    @Value("${jwt.secret}")
    private String secret;

    // Set expiration time to 60 minutes (60 * 60 * 1000 milliseconds)
    private static final long EXPIRATION_TIME_MS = 60 * 60 * 1000;

    public String generateToken(String email, String username) {
        return Jwts.builder()
                .setSubject(email)
                .claim("username", username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String getSecret() {
        return secret;
    }
}

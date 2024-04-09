package com.example.CRUD;

import java.sql.Date;
import java.sql.Time;

public class Employee {
    private Long id;
    private String username;
    private String email;
    private Date date;
    private Time time;

    public Employee(Long id, String username, String email, Date date, Date time) {
        // Default constructor
    }

    public Employee(Long id, String username, String email, Date date, Time time) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.date = date;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}

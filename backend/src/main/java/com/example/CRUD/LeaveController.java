package com.example.CRUD;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/leave")
public class LeaveController {

    private final LeaveRepository leaveRepository;

    @Autowired
    public LeaveController(LeaveRepository leaveRepository) {
        this.leaveRepository = leaveRepository;
    }

    @PostMapping("/apply")
    public ResponseEntity<?> applyLeave(@RequestBody Leave leave) {
        try {
            Leave savedLeave = leaveRepository.save(leave);
            return new ResponseEntity<>(savedLeave, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to apply leave: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getLeaveStatus(@RequestParam String email) {
        try {
            return new ResponseEntity<>(leaveRepository.findByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to get leave status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/manage-leave")
    public ResponseEntity<?> getAllLeaveRequests() {
        try {
            return new ResponseEntity<>(leaveRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to get leave requests: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update-status/{leaveId}")
    public ResponseEntity<?> updateLeaveStatus(@PathVariable Long leaveId, @RequestBody Leave leaveUpdate) {
        try {
            Optional<Leave> optionalLeave = leaveRepository.findById(leaveId);
            if (optionalLeave.isPresent()) {
                Leave leave = optionalLeave.get();
                leave.setStatus(leaveUpdate.getStatus());
                leaveRepository.save(leave);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update leave status: " + e.getMessage());
        }
    }
}

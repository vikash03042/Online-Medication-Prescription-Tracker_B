package com.medicationtracker.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PutMapping("/profile")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('PHARMACIST') or hasRole('ADMIN')")
    public ResponseEntity<?> updateProfile(@RequestBody User userRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        // Update fields if they are provided
        if (userRequest.getPhoneNumber() != null)
            user.setPhoneNumber(userRequest.getPhoneNumber());
        if (userRequest.getAddress() != null)
            user.setAddress(userRequest.getAddress());
        if (userRequest.getMedicalLicenseNumber() != null)
            user.setMedicalLicenseNumber(userRequest.getMedicalLicenseNumber());
        if (userRequest.getSpecialization() != null)
            user.setSpecialization(userRequest.getSpecialization());
        if (userRequest.getShopDetails() != null)
            user.setShopDetails(userRequest.getShopDetails());
        if (userRequest.getMedicalHistory() != null)
            user.setMedicalHistory(userRequest.getMedicalHistory());

        userRepository.save(user);

        return ResponseEntity.ok("Profile updated successfully!");
    }

    @GetMapping("/profile")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('PHARMACIST') or hasRole('ADMIN')")
    public ResponseEntity<?> getProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        return ResponseEntity.ok(user);
    }
}

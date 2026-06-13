package com.medicationtracker.auth.payload;

import java.util.Set;
import lombok.Data;
import com.medicationtracker.auth.Role;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private Role role;

    private String medicalLicenseNumber;
    private String specialization;
    private String shopDetails;
    private String medicalHistory;
    private String phoneNumber;
    private String address;
}

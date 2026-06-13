package com.medicationtracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;
    private String patientName;
    private String patientEmail;
    private Long doctorId;

    private String medicationName;
    private String dosage;
    private String duration; // e.g., "7 days"

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Enumerated(EnumType.STRING)
    private PrescriptionStatus status; // ACTIVE, EXPIRED, RENEWED

    private Integer version = 1;

    // Storing PDF as a byte array for simplicity as per plan
    @Lob
    @Column(length = 10000000) // Large blob
    private byte[] pdfFile;

    private String pdfFileName;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null)
            status = PrescriptionStatus.ACTIVE;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

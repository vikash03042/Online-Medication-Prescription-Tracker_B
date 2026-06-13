package com.medicationtracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "medication_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long medicationId;
    private Long patientId;

    private LocalDateTime scheduledTime;

    @Enumerated(EnumType.STRING)
    private LogStatus status; // TAKEN, MISSED, SNOOZED

    private LocalDateTime takenTime;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

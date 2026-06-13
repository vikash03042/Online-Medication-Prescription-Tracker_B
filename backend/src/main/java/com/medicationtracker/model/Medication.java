package com.medicationtracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "medications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long patientId;

    private String name;
    private String dosage; // e.g., "200mg"

    @Enumerated(EnumType.STRING)
    private Frequency frequency; // DAILY, ALTERNATE_DAYS, CUSTOM

    private LocalTime timeOfDay; // e.g., 09:00

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType; // EMAIL, PUSH

    private boolean active = true;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

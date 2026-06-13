package com.medicationtracker.service;

import com.medicationtracker.model.LogStatus;
import com.medicationtracker.model.MedicationLog;
import com.medicationtracker.repository.MedicationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdherenceService {

    @Autowired
    MedicationLogRepository medicationLogRepository;

    public double calculateAdherence(Long patientId) {
        List<MedicationLog> logs = medicationLogRepository.findByPatientId(patientId);
        if (logs.isEmpty())
            return 100.0; // Default to perfect score if no logs yet

        long takenCount = logs.stream()
                .filter(log -> log.getStatus() == LogStatus.TAKEN)
                .count();

        return (double) takenCount / logs.size() * 100;
    }

    // Logic to generate alerts would go here, e.g., @Scheduled task running daily
    public void checkForLowAdherence() {
        // Implementation:
        // 1. Get all patients
        // 2. For each patient, calculate adherence
        // 3. If adherence < 50%, create an alert for their doctor
        // (Skipped for MVP simplicity, will implement if requested)
    }
}

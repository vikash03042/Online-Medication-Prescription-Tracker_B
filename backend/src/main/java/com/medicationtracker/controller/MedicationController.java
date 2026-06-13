package com.medicationtracker.controller;

import com.medicationtracker.model.*;
import com.medicationtracker.repository.MedicationLogRepository;
import com.medicationtracker.repository.MedicationRepository;
import com.medicationtracker.auth.payload.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    @Autowired
    MedicationRepository medicationRepository;

    @Autowired
    MedicationLogRepository medicationLogRepository;

    @Autowired
    com.medicationtracker.service.AdherenceService adherenceService;

    @GetMapping("/adherence/{patientId}")
    public ResponseEntity<Double> getAdherence(@PathVariable Long patientId) {
        return ResponseEntity.ok(adherenceService.calculateAdherence(patientId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMedication(@RequestBody Medication medication) {
        medicationRepository.save(medication);

        // Log the first scheduled dose for today (simplified logic)
        MedicationLog log = new MedicationLog();
        log.setMedicationId(medication.getId());
        log.setPatientId(medication.getPatientId());
        log.setScheduledTime(LocalDateTime.now().with(medication.getTimeOfDay()));
        log.setStatus(LogStatus.MISSED); // Default until marked taken
        medicationLogRepository.save(log);

        return ResponseEntity.ok(new MessageResponse("Medication added successfully!"));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Medication>> getPatientMedications(@PathVariable Long patientId) {
        return ResponseEntity.ok(medicationRepository.findByPatientId(patientId));
    }

    @PostMapping("/log")
    public ResponseEntity<?> logDose(@RequestBody MedicationLog log) {
        log.setTakenTime(LocalDateTime.now());
        medicationLogRepository.save(log);
        return ResponseEntity.ok(new MessageResponse("Dose updated successfully!"));
    }

    @GetMapping("/logs/{patientId}")
    public ResponseEntity<List<MedicationLog>> getPatientLogs(@PathVariable Long patientId) {
        return ResponseEntity.ok(medicationLogRepository.findByPatientId(patientId));
    }
}

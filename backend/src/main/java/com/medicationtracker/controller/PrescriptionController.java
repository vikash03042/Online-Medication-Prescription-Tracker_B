package com.medicationtracker.controller;

import com.medicationtracker.model.Prescription;
import com.medicationtracker.model.PrescriptionStatus;
import com.medicationtracker.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.medicationtracker.auth.payload.MessageResponse;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    @Autowired
    PrescriptionRepository prescriptionRepository;

    @Autowired
    com.medicationtracker.auth.UserRepository userRepository;

    @PostMapping("/issue")
    public ResponseEntity<?> issuePrescription(
            @RequestParam("patientEmail") String patientEmail,
            @RequestParam("doctorId") Long doctorId,
            @RequestParam("medicationName") String medicationName,
            @RequestParam("dosage") String dosage,
            @RequestParam("duration") String duration,
            @RequestParam("instructions") String instructions,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            com.medicationtracker.auth.User patient = userRepository.findByEmail(patientEmail)
                    .orElseThrow(() -> new RuntimeException("Patient not found with email: " + patientEmail));

            Prescription prescription = new Prescription();
            prescription.setPatientId(patient.getId());
            prescription.setPatientName(patient.getName());
            prescription.setPatientEmail(patient.getEmail());
            prescription.setDoctorId(doctorId);
            prescription.setMedicationName(medicationName);
            prescription.setDosage(dosage);
            prescription.setDuration(duration);
            prescription.setInstructions(instructions);
            prescription.setStatus(PrescriptionStatus.ACTIVE);
            prescription.setVersion(1);

            if (file != null && !file.isEmpty()) {
                prescription.setPdfFile(file.getBytes());
                prescription.setPdfFileName(file.getOriginalFilename());
            }

            prescriptionRepository.save(prescription);

            return ResponseEntity.ok(new MessageResponse("Prescription issued successfully!"));
        } catch (RuntimeException | IOException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionRepository.findByPatientId(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> getDoctorPrescriptions(@PathVariable Long doctorId) {
        return ResponseEntity.ok(prescriptionRepository.findByDoctorId(doctorId));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        Optional<Prescription> prescriptionOpt = prescriptionRepository.findById(id);
        if (prescriptionOpt.isPresent()) {
            Prescription prescription = prescriptionOpt.get();
            if (prescription.getPdfFile() != null) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                "attachment; filename=\"" + prescription.getPdfFileName() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(prescription.getPdfFile());
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrescription(@PathVariable Long id) {
        try {
            prescriptionRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Prescription deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePrescription(@PathVariable Long id, @RequestBody Prescription prescriptionDetails) {
        try {
            Prescription prescription = prescriptionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: Prescription not found."));

            prescription.setMedicationName(prescriptionDetails.getMedicationName());
            prescription.setDosage(prescriptionDetails.getDosage());
            prescription.setDuration(prescriptionDetails.getDuration());
            prescription.setInstructions(prescriptionDetails.getInstructions());

            prescriptionRepository.save(prescription);
            return ResponseEntity.ok(new MessageResponse("Prescription updated successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
}

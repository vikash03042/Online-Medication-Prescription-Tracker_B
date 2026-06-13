package com.medicationtracker.repository;

import com.medicationtracker.model.MedicationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicationLogRepository extends JpaRepository<MedicationLog, Long> {
    List<MedicationLog> findByPatientId(Long patientId);

    List<MedicationLog> findByMedicationId(Long medicationId);
}

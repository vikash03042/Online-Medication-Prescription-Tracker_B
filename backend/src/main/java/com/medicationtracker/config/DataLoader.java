package com.medicationtracker.config;

import com.medicationtracker.auth.Role;
import com.medicationtracker.auth.User;
import com.medicationtracker.auth.UserRepository;
import com.medicationtracker.model.Drug;
import com.medicationtracker.model.Prescription;
import com.medicationtracker.model.PrescriptionStatus;
import com.medicationtracker.repository.DrugRepository;
import com.medicationtracker.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

        @Autowired
        DrugRepository drugRepository;

        @Autowired
        UserRepository userRepository;

        @Autowired
        PrescriptionRepository prescriptionRepository;

        @Autowired
        PasswordEncoder encoder;

        @Override
        public void run(String... args) throws Exception {
                seedDrugs();
                seedUsersAndPrescriptions();
        }

        private void seedDrugs() {
                if (drugRepository.count() == 0) {
                        drugRepository.save(new Drug(null, "Amoxicillin 500mg", "AMX-2024-001",
                                        LocalDate.of(2025, 12, 31), 150,
                                        12.50, "PharmaCorp", 20, "Antibiotic", null, null));
                        drugRepository.save(new Drug(null, "Atorvastatin 20mg", "ATV-2024-055",
                                        LocalDate.of(2026, 6, 15), 500,
                                        45.00, "HealthMed", 30, "Cholesterol", null, null));
                        drugRepository.save(new Drug(null, "Metformin 850mg", "MET-2023-889", LocalDate.of(2025, 3, 20),
                                        45, 8.40,
                                        "GlucoCare", 50, "Diabetes", null, null));
                        drugRepository.save(new Drug(null, "Ibuprofen 400mg", "IBU-2024-112", LocalDate.of(2027, 1, 1),
                                        8, 5.99,
                                        "PainFree Ltd", 10, "Pain Relief", null, null));
                        drugRepository.save(new Drug(null, "Lisinopril 10mg", "LIS-2024-334", LocalDate.of(2025, 9, 10),
                                        200, 15.20,
                                        "HeartSafe", 25, "Blood Pressure", null, null));
                        drugRepository.save(new Drug(null, "Omeprazole 20mg", "OME-2024-998",
                                        LocalDate.of(2024, 11, 30), 5, 22.10,
                                        "GastroMed", 15, "Acid Reflux", null, null));

                        System.out.println("Data Loaded: Sample drugs added.");
                }
        }

        private void seedUsersAndPrescriptions() {
                String password = encoder.encode("password123");

                // Seed Admin
                updateOrCreateUser("Admin User", "admin@gmail.com", password, Role.ADMIN, null, null, null, null,
                                "9999999999", "Admin Office");

                // Seed Doctors
                List<User> doctors = new ArrayList<>();
                String[] docNames = { "Dr. Himanshi", "Dr. Rajesh", "Dr. Sneha", "Dr. Vikram", "Dr. Anjali",
                                "Dr. Deepak", "Dr. Sunita", "Dr. Rohan", "Dr. Kavita", "Dr. Vivek" };
                for (int i = 0; i < docNames.length; i++) {
                        String email = docNames[i].toLowerCase().replace(" ", "").replace(".", "") + "@gmail.com";
                        User doc = updateOrCreateUser(docNames[i], email, password, Role.DOCTOR, "LIC-" + (1000 + i),
                                        "General Medicine", null, null, "987654321" + i, "Medical Center " + i);
                        doctors.add(doc);
                }

                // Seed Pharmacists
                String[] pharmNames = { "Suresh", "Meena", "Karan", "Pooja", "Arjun" };
                for (int i = 0; i < pharmNames.length; i++) {
                        String email = pharmNames[i].toLowerCase() + "@gmail.com";
                        updateOrCreateUser(pharmNames[i], email, password, Role.PHARMACIST, null, null,
                                        "City Pharmacy " + i, null, "887654321" + i, "Pharmacy Street " + i);
                }

                // Seed Patients (25 Indian names)
                String[] patNames = {
                                "Arun", "Priya", "Rahul", "Meera", "Sanjay", "Kavita", "Amit", "Deepa",
                                "Rohan", "Sunita", "Vikas", "Neha", "Abhishek", "Ishita", "Manoj", "Shweta",
                                "Vijay", "Aarti", "Harish", "Pooja", "Raj", "Simran", "Yash", "Tanvi", "Aditya"
                };
                for (int i = 0; i < patNames.length; i++) {
                        String email = patNames[i].toLowerCase().replace(" ", "") + "@gmail.com";
                        User patient = updateOrCreateUser(patNames[i], email, password, Role.PATIENT, null, null, null,
                                        "History of index " + i, "787654321" + i, "Patient House " + i);

                        // Add prescriptions if patient was newly created or has no prescriptions
                        if (prescriptionRepository.countByPatientEmail(email) == 0) {
                                for (int j = 0; j < 2; j++) {
                                        User doc = doctors.get((i + j) % doctors.size());
                                        Prescription p = new Prescription();
                                        p.setPatientId(patient.getId());
                                        p.setPatientName(patient.getName());
                                        p.setPatientEmail(patient.getEmail());
                                        p.setDoctorId(doc.getId());
                                        p.setMedicationName(j == 0 ? "Paracetamol 500mg" : "Cetirizine 10mg");
                                        p.setDosage(j == 0 ? "1-0-1" : "0-0-1");
                                        p.setDuration("7 days");
                                        p.setInstructions(j == 0 ? "After meal" : "Before sleep");
                                        p.setStatus(PrescriptionStatus.ACTIVE);
                                        prescriptionRepository.save(p);
                                }
                                System.out.println("Seeded Prescriptions for: " + email);
                        }
                }
                System.out.println("Data Seeding Verification Complete.");
        }

        private User updateOrCreateUser(String name, String email, String password, Role role, String license,
                        String specialization, String shop, String history, String phone, String address) {
                User user = userRepository.findByEmail(email).orElse(new User());
                user.setName(name);
                user.setEmail(email);
                user.setPassword(password);
                user.setRole(role);
                user.setMedicalLicenseNumber(license);
                user.setSpecialization(specialization);
                user.setShopDetails(shop);
                user.setMedicalHistory(history);
                user.setPhoneNumber(phone);
                user.setAddress(address);
                User saved = userRepository.save(user);
                System.out.println("Sync/Seed User: " + email + " [Password Reset to password123]");
                return saved;
        }
}

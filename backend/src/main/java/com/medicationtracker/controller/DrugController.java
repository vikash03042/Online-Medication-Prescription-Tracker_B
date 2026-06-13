package com.medicationtracker.controller;

import com.medicationtracker.model.Drug;
import com.medicationtracker.repository.DrugRepository;
import com.medicationtracker.auth.payload.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/inventory")
public class DrugController {

    @Autowired
    DrugRepository drugRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addDrug(@RequestBody Drug drug) {
        drugRepository.save(drug);
        return ResponseEntity.ok(new MessageResponse("Drug added successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDrug(@PathVariable Long id, @RequestBody Drug drugDetails) {
        Drug drug = drugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drug not found with id: " + id));

        drug.setName(drugDetails.getName());
        drug.setBatchNumber(drugDetails.getBatchNumber());
        drug.setExpiryDate(drugDetails.getExpiryDate());
        drug.setQuantity(drugDetails.getQuantity());
        drug.setPrice(drugDetails.getPrice());
        drug.setSupplier(drugDetails.getSupplier());
        drug.setLowStockThreshold(drugDetails.getLowStockThreshold());

        drugRepository.save(drug);
        return ResponseEntity.ok(new MessageResponse("Drug updated successfully!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDrug(@PathVariable Long id) {
        drugRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Drug deleted successfully!"));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        return ResponseEntity.ok(drugRepository.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Drug>> searchDrugs(@RequestParam String query) {
        return ResponseEntity.ok(drugRepository.findByNameContainingIgnoreCase(query));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Drug>> getLowStockDrugs() {
        // Hardcoded threshold for simplicity if not using per-drug threshold logic
        // globally
        return ResponseEntity.ok(drugRepository.findByQuantityLessThanEqual(10));
    }
}

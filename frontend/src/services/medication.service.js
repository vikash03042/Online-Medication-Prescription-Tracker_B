import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/medications/";

const addMedication = (name, dosage, frequency, timeOfDay, notificationType) => {
    const user = AuthService.getCurrentUser();
    return axios.post(API_URL + "add", {
        patientId: user.id,
        name,
        dosage,
        frequency,
        timeOfDay,
        notificationType
    }, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const getPatientMedications = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + `patient/${user.id}`, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const logDose = (medicationId, status) => {
    const user = AuthService.getCurrentUser();
    return axios.post(API_URL + "log", {
        medicationId,
        patientId: user.id,
        status
    }, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const getAdherence = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + `adherence/${user.id}`, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const MedicationService = {
    addMedication,
    getPatientMedications,
    logDose,
    getAdherence
};

export default MedicationService;

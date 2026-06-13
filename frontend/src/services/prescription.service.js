import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/prescriptions/";

const issuePrescription = (patientEmail, medicationName, dosage, duration, instructions, file) => {
    const user = AuthService.getCurrentUser();
    const formData = new FormData();
    formData.append("patientEmail", patientEmail);
    formData.append("doctorId", user.id);
    formData.append("medicationName", medicationName);
    formData.append("dosage", dosage);
    formData.append("duration", duration);
    formData.append("instructions", instructions);
    if (file) {
        formData.append("file", file);
    }

    // Add auth header if needed (axios interceptor might handle this, but explicit here for safety)
    const token = user && user.token ? `Bearer ${user.token}` : '';

    return axios.post(API_URL + "issue", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token
        },
    });
};

const getPatientPrescriptions = () => {
    const user = AuthService.getCurrentUser();
    const token = user && user.token ? `Bearer ${user.token}` : '';
    return axios.get(API_URL + `patient/${user.id}`, {
        headers: { "Authorization": token }
    });
};

const getDoctorPrescriptions = () => {
    const user = AuthService.getCurrentUser();
    const token = user && user.token ? `Bearer ${user.token}` : '';
    return axios.get(API_URL + `doctor/${user.id}`, {
        headers: { "Authorization": token }
    });
};

const deletePrescription = (id) => {
    const user = AuthService.getCurrentUser();
    const token = user && user.token ? `Bearer ${user.token}` : '';
    return axios.delete(API_URL + id, {
        headers: { "Authorization": token }
    });
};

const updatePrescription = (id, data) => {
    const user = AuthService.getCurrentUser();
    const token = user && user.token ? `Bearer ${user.token}` : '';
    return axios.put(API_URL + id, data, {
        headers: { "Authorization": token }
    });
};

const PrescriptionService = {
    issuePrescription,
    getPatientPrescriptions,
    getDoctorPrescriptions,
    deletePrescription,
    updatePrescription
};

export default PrescriptionService;

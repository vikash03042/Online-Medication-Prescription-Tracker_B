import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/analytics/";

const getAdminStats = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + "admin/stats", {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const getPharmacistOverview = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + "pharmacist/overview", {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const getPatientHistory = (id) => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + `patient/${id}/history`, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const getDoctorStats = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + "doctor/stats", {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const AnalyticsService = {
    getAdminStats,
    getPharmacistOverview,
    getPatientHistory,
    getDoctorStats
};

export default AnalyticsService;

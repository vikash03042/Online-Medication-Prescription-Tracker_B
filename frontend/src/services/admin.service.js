import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/admin/";

const getAdminStats = () => {
    const user = AuthService.getCurrentUser();
    const token = user && user.token ? `Bearer ${user.token}` : '';
    return axios.get(API_URL + "stats", {
        headers: { "Authorization": token }
    });
};

const AdminService = {
    getAdminStats
};

export default AdminService;

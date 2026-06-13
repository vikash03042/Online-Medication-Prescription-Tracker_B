import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

const getProfile = () => {
    return axios.get(API_URL + "profile", { headers: authHeader() });
};

const updateProfile = (data) => {
    return axios.put(API_URL + "profile", data, { headers: authHeader() });
};

const UserService = {
    getProfile,
    updateProfile,
};

export default UserService;

import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "http://localhost:8080/api/inventory/";

const getAllDrugs = () => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + "all", {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const searchDrugs = (query) => {
    const user = AuthService.getCurrentUser();
    return axios.get(API_URL + `search?query=${query}`, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const addDrug = (drug) => {
    const user = AuthService.getCurrentUser();
    return axios.post(API_URL + "add", drug, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const deleteDrug = (id) => {
    const user = AuthService.getCurrentUser();
    return axios.delete(API_URL + id, {
        headers: { "Authorization": `Bearer ${user.token}` }
    });
};

const InventoryService = {
    getAllDrugs,
    searchDrugs,
    addDrug,
    deleteDrug
};

export default InventoryService;

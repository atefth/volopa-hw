import axios from 'axios';
import {
    getCurrentUser
} from "../../services/Auth";


export const instance = (baseURL) => {
    const instance = axios.create({
        baseURL
    })

    instance.interceptors.request.use(
        config => {
            const {
                token
            } = getCurrentUser();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            config.headers['Content-Type'] = 'application/json';
            return config
        },
        error => {
            Promise.reject(error)
        }
    )
    return instance;
}

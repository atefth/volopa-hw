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
            const user = getCurrentUser();
            if (user?.token) {
                config.headers['Authorization'] = `Bearer ${user.token}`
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

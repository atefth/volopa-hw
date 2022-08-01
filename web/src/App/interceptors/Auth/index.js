import axios from 'axios';
import { KEY } from '../../store';

export const instance = (baseURL) => {
    const instance = axios.create({
        baseURL
    })

    instance.interceptors.request.use(
        config => {
            const user = JSON.parse(localStorage.getItem(KEY));
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

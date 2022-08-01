import {
    instance
} from "../../interceptors/Auth";

const ENDPOINT = "http://localhost/api";
const KEY = "_auth";

export const check = () => {
    const axios = instance(ENDPOINT);
    return axios
        .get('user')
        .then((response) => {
            return response.data;
        });
};

export const login = ({
    email,
    password
}) => {
    const axios = instance(ENDPOINT);
    return axios
        .post('login', {
            email,
            password,
            password_confirmation: password
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem(KEY, JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const clearToken = () => {
    localStorage.removeItem(KEY);
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(KEY));
};

export const updateToken = (token) => {
    localStorage.setItem(KEY, JSON.stringify({
        ...getCurrentUser(),
        token
    }))
}

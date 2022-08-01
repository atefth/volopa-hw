import {
    instance
} from "../../interceptors/Auth";

const ENDPOINT = "http://localhost/api";

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
            return response.data;
        }).catch(error => {
            let str;
            const {
                message,
                errors
            } = error.response.data;
            if (errors) {
                str = errors.reduce((err, msg) => `${msg} \n ${err}`, '');
            } else {
                str = message
            }
            return Promise.reject(str);
        });
};

export const logout = (token) => {
    const axios = instance(ENDPOINT);
    return axios.post('logout', null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const AuthService = {
    login,
    logout,
    check
};

export default AuthService;

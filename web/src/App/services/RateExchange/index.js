import {
    instance
} from "../../interceptors/Auth";

const ENDPOINT = "http://localhost/api";

export const convert = ({
    to,
    from
}) => {
    const axios = instance(ENDPOINT);
    return axios
        .post('convert', {
            to_amount: to,
            from_amount: from
        })
        .then((response) => {
            return response.data;
        });
};

import {
    instance
} from "../../interceptors/Auth";

const ENDPOINT = "http://localhost/api";

export const convert = ({
    from,
    to
}) => {
    const axios = instance(ENDPOINT);
    return axios
        .post('convert', {
            from_currency: from.currency,
            from_amount: from.amount,
            to_currency: to.currency,
            to_amount: to.amount,
        })
        .then((response) => {
            return response.data;
        });
};

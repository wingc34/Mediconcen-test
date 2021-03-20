import axios from 'axios';

export const apiPost = (url, content) => {
    return axios.post(url, content).then((res) => {
        return res.data;
    });
};

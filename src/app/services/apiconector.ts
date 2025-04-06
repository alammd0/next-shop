import axios from "axios";


export const instance = axios.create({
    baseURL: '/api',
});


export const apiConnector = async (method: string, url: string, data?: any, headers: any = {}) => {
    try {
        const response = await instance.request({
            method: method,
            url: url,
            data: data,
            headers: headers,
        });

        console.log(response.data);

        return response.data
    }
    catch (err) {
        console.log(err);
        return err
    }
};



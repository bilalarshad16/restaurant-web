import axios from 'axios'

const config = { withCredentials: true }
// const config = { credentials: 'include'}

export const postData = async (endPoint, data) => {
    try {
        const resp = await axios.post(import.meta.env.VITE_APP_SERVER_URL + endPoint, data, config)
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const putData = async (endPoint, data) => {
    try {
        const resp = await axios.put(import.meta.env.VITE_APP_SERVER_URL + endPoint, data, config)
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postFormData = async (formData) => {
    try {
        const resp = await axios.post(import.meta.env.VITE_APP_UPLOAD_URL, formData);
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getData = async (endPoint) => {
    try {
        const resp = await axios.get(import.meta.env.VITE_APP_SERVER_URL + endPoint, config)
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getExternalData = async (endPoint,headers) => {
    try {
        const resp = await axios.get(endPoint,{ headers: headers })
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postExternalData = async (endPoint, data) => {
    try {
        const resp = await axios.post(endPoint, data, {
            headers: {
                'Authorization': `Bearer CDQgxeDGxa9zuvvlwc0lVu4PgBlPRurUo9XN2Dl0wWrWUS58ani5S`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
        console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteData = async (endPoint) => {
    try {
        const resp = await axios.delete(import.meta.env.VITE_APP_SERVER_URL + endPoint, config)
        // console.log(resp);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}





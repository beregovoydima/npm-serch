import axios from "axios";

const instance = axios.create({
    baseURL:'https://registry.npmjs.com',
    timeout: 5000,
})

instance.interceptors.response.use(response => response.data)

export default instance

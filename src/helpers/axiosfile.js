import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'https://6490290f1e6aa71680caba5d.mockapi.io',
});
export const axiosPublicInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export default axiosInstance;
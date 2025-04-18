import axios from "axios";

const instance = axios.create({
    baseURL:"https://robomania-frontend.onrender.com/api",
    withCredentials: true,
})

export default instance
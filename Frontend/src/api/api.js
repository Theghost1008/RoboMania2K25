import axios from "axios";

const instance = axios.create({
    baseURL:"https://robomania-backend.onrender.com/api",
    withCredentials: true,
})

export default instance
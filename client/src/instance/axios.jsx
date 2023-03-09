import axios from "axios";

export const axiosUserInstance = axios.create({
    baseURL: "http://localhost:4000/users"
})

export const axiosExpertInstance = axios.create({
    baseURL: "http://localhost:4000/admin"
})
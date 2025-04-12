import axios from 'axios'


export const axiosinsitance = axios.create({
    baseURL:'http://localhost:1000',
    withCredentials:true,
})
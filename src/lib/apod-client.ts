import axios from 'axios'

export const apodClient = axios.create({
    baseURL: 'https://api.nasa.gov/planetary'
})
import axios from 'axios'

export const apod_client = axios.create({
    baseURL: 'https://api.nasa.gov/planetary'
})
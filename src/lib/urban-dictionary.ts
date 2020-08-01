import axios from 'axios'

export const udClient = axios.create({
    baseURL: 'https://api.urbandictionary.com/v0'
})
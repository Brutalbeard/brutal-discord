import axios from 'axios';

export const ud_client = axios.create({
    baseURL: 'https://api.urbandictionary.com/v0'
});
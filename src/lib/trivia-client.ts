import axios from 'axios'

export const triviaClient = axios.create({
    baseURL: 'https://opentdb.com'
})
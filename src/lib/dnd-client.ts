import axios from 'axios'

const dnd = axios.create({
    baseURL: "http://dnd5eapi.co/api"
})

export default dnd
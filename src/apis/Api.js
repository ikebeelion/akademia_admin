import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaapp.herokuapp:8000/api"
})

Api.defaults.withCredentials = true

export default Api
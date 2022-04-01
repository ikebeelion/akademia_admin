import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaadmin.vercel.app//api"
})

Api.defaults.withCredentials = true

export default Api
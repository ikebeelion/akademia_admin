import axios from 'axios'

let Api = axios.create({
    baseURL: "http://akademiaapi.herokuapp.com/api"
})

Api.defaults.withCredentials = true

export default Api
import axios from 'axios'

let Api = axios.create({    
    baseURL: "https://akademia.powerfields.ng/api",
    // baseURL: "http://localhost:8000/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    },
})

Api.defaults.withCredentials = true

export default Api

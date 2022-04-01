import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaadmin-3y2gsji1j-ikebeelion.vercel.app/api"
})

Api.defaults.withCredentials = true

export default Api
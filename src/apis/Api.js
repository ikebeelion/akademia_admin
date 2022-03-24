import axios from 'axios'

let Api = axios.create({
    baseURL: "https://akademiaapi.herokuapp.com/api"
})

let user_token = $('meta[name="user-token]').attr('content')
// Api.defaults.withCredentials = true
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = `Bear ${user_token}`;

export default Api
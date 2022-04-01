import Api from "./Api"
import Csrf from "./Csrf"

export default {
    async getCountry(){
        await Csrf.getCookie()
        return Api.get('/country/')
    },
    async getState(countryid){
        await Csrf.getCookie()
       return Api.get('/state/'+countryid)
    },
    async getCity(stateid){
        await Csrf.getCookie()
        return Api.get('/city/'+stateid) 
    },
    async submitData(form){
        await Csrf.getCookie()
        return Api.post('/schregister/', form)
        
    },
}
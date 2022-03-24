import Api from "./Api"

export default {
    getCountry(){
        return Api.get('/country/')
    },
    getState(countryid){
       return Api.get('/state/'+countryid)
    },
    getCity(stateid){
        return Api.get('/city/'+stateid) 
    },
    submitData(form){
        return Api.post('/schregister/', form)
        
    },
}
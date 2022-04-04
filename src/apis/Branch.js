import Api from './Api'

export default{
    getCountry(){
        return Api.get('/country')
    },
    getState(countryid){
        return Api.get('/state/'+countryid)
    },
    getCity(stateid){
        return Api.get('/city/'+stateid)
    },
    getBranches(schoolid){
        return Api.get('/branch/'+schoolid)
    },
    addBranch(form){
        return Api.post('/branch/store', form)
    },
    getSingleBranch(id){
        return Api.get('/singlebranch/'+id)
    },
    updateBranch(id, form){
        return Api.put('/updateBranch/'+id, form)
    },
    deleteBranch(id){
        return Api.delete('/deleteBranch/'+id)
    },
}
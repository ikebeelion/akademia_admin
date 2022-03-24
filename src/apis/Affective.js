import Api from './Api'

export default{    
    getDomains(branchid){
        return Api.get('/domains/'+branchid)
    },
    getSingleDomain(id){
        return Api.get('/singledomain/'+id)
    },
    addDomain(form){
        return Api.post('/domains/store',form)
    },
    updateDomain(id, form){
        return Api.put('/updatedomain/'+id, form)
    },
    deleteDomain(id){
        return Api.delete('/deletedomain/'+id)
    }
}
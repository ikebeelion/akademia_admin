import Api from "./Api"

export default{            
    getType(branchid){
        return Api.get('/type/'+branchid)
    },
    getSingleType(id){
        return Api.get('/singletype/'+id)
    },
    addType(form){
        return Api.post('/type/store', form)
    },
    updateType(id, form){
        return Api.post('/updateType/'+id, form)
    },
    deleteType(id){
        return Api.delete('/deleteType/'+id)
    },
}
import Api from './Api'

export default{
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getSingleGroup(id){
        return Api.get('/singlegroup/'+id)
    },
    addClassGroup(form){
        return Api.post('/classGroups/store/', form)
    },
    updateGroup(id, form){
        return Api.put('/updateGroup/'+id, form)
    },
    deleteGroup(id){
        return Api.delete('/deleteGroup/'+id)
    },
}
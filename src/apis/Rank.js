import Api from './Api'

export default{
    getRanks(branchid){
        return Api.get('/ranks/'+branchid)
    },
    getSingleRank(id){
        return Api.get('/singlerank/'+id)
    },
    addRank(form){
        return Api.post('/rank/store/', form)
    },
    updateRank(id, form){
        return Api.put('/updateRank/'+id, form)
    },
    deleteRank(id){
        return Api.delete('/deleteRank/'+id)        
    }
}
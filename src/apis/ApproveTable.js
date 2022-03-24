import Api from "./Api"

export default{    
    getTable(branchid){
        return Api.get('/gettable/'+branchid)
    },
    approve(id){
        return Api.put('/approvetable/'+id)
    },
    disapprovetable(id){
        return Api.put('/disapprovetable/'+id)
    },
    deleteTimetable(id){
        return Api.delete('/deletetable/'+id)
    },
    
}
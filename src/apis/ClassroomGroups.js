import Api from './Api.js'

export default{
    getClassRooms(branchid){
        return Api.get('/classRooms/'+branchid)
    },
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getClassRoomGroup(branchid){
        return Api.get('/classRoomGroup/'+branchid)        
    },
    getSingleClassRoomGroup(id){
        return Api.get('/singleroomgroup/'+id)
    },
    assignClassRoomGroup(form){
        return Api.post('/classRoomGroup/store', form)
    },
    updateRoomGroup(id, form){
        return Api.put('/updateRoomGroup/'+id, form)
    },
    deleteRoomGroup(id){
        return Api.delete('/deleteRoomGroup/'+id)
    },
}
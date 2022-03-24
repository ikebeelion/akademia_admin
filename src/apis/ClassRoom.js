import Api from './Api'

export default {
    getClassRooms(branchid){
        return Api.get('/classRooms/'+branchid)
    },
    getSingleRoom(id){
        return Api.get('/singleroom/'+id)
    },
    addClassRoom(form){
        return Api.post('/classRooms/store', form)
    },
    updateRoom(id, form){
        return Api.put('/updateRoom/'+id, form)
    },
    deleteRoom(id){
        return Api.delete('/deleteRoom/'+id)
    },
}
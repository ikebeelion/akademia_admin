import Api from "./Api"

export default{
    
    promoteStudents(form){
        return Api.post('/promote', form)
    },

    getClassRooms(branchid){
        return Api.get('/classRoomGroup/'+branchid)
    },

    getStudentsInRoom(classid){
        return Api.get('/studentsinroom/'+classid); 
    }
}
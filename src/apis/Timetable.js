import Api from "./Api"

export default{
    
    getClassGroupsRoom(branchid){
        return Api.get('/classRoomGroup/'+branchid)
    },
    getClassGroup(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getClassGroupSubjects(branchid){
        return Api.get('/subjectGrpt/'+branchid)
    },
    getAcademicPeriod(branchid){
        return Api.get('/period/'+branchid)
    },
    saveTimeTable(form){
        return Api.post('/timetable/store/', form)
    },
}
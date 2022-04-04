import Api from './Api'

export default{
    getCountry(){
        return Api.get('/country')
    },
    getState(countryid){
        return Api.get('/state/'+countryid)
    },
    getStateofO(countryid){
        return Api.get('/state/'+countryid)
    },
    getCity(stateid){
        return Api.get('/city/'+stateid)
    },
    getRank(branchid){
        return Api.get('/ranks/'+branchid)
    },
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getStaff(branchid){
        return Api.get('/all-staff/'+branchid)
    },
    addStaff(form){
        return Api.post('/staff/store', form)
    },
    getSingleStaff(id){
        return Api.get('/staff/'+id)
    },
    updateStaff(id, form){
        return Api.put('/staff-update/'+id, form)
    },
    deleteStaff(id){
        return Api.delete('/delete-staff/'+id)
    },
    getSubjectGroup(branchid){
        return Api.get('/subjectGroup/'+branchid)
    },
    assSubject(id){
        return Api.get('/staff/'+id)
    },
    saveSubjectAssign(allsubjectgroups){
        return Api.post('/savesubjectassign/',allsubjectgroups)
    },
    getSubjectTeacher(id){
        return Api.get('/suject_teacher/'+id)        
    },
    deleteTutorSubject(id){
        return Api.delete('/delete-subjecttutor/'+id)
    },
    getClassroomGroups(branchid){
        return Api.get('/classRoomGroup/'+branchid)
    },
    assignClassRoomGroup(id){
        return Api.get('/staff/'+id)
    },    
    saveClassRoomTeacherAssign(form){
        return Api.post('/saveclassRoomTeacher/', form)
    },
    getClassRoomTeacher(id){
        return Api.get('/classroom_teacher/'+id)
    },
    deleteclassroomteacher(id){
        return Api.delete('/delete-classroomteacher/'+id)
    },
    gethistory(id){
        return Api.get('/emphistory/'+id)
    },
    addemployment(form){
        return Api.post('/addemployment', form)
    },
    getsingleemployment(id){
        return Api.get('/getSingleEmployment/'+id)
    },
    updateemployment(id, form){
        return Api.put('/updateEmployment/'+id, form)
    },
    deleteemployment(id){
        return Api.delete('/deleteEmployment/'+id)
    },
    uploadImage(formData, config){
        return Api.post('/uploadStaffImage', formData, config )
    }
    




}
import Api from './Api'

export default {
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)   
    },
    getCountry(){
        return Api.get('/country/')
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
        getStudents(branchid){
            return Api.get('/all-students/'+branchid)
        },
        addStudent(form){
            return Api.post('/student/store/', form)
        },
        getSingleStudent(id){
            return Api.get('/student/'+id)
        },
        updateStudent(id, form){
            return Api.put('/student-update/'+id, form)
        },
        deleteStudent(id){
            return Api.delete('/delete-student/'+id)
        },        
        getStudentClassRoom(studentid){
            return Api.get('/studentClassroom/'+studentid)
        },
        uploadImage(formData, config){
            return Api.post('/studentImage/', formData, config)
        },
        addStudentToClassRoom(classdetails){
            return Api.post('/studentclassroom/', classdetails)
        },
        yearclassroom(yearid){
            return Api.get('/yearclassroom/'+yearid)

        },
        getStudentSingle(studentid){
            return Api.get('/user/'+studentid)
        },

        getRoomGroup(id){
            return Api.get('/classrmgroup/'+id)
        }


        
    
}
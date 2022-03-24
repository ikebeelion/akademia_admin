import Api from './Api'

export default{ 
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
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getSingleStudent(id){
        return Api.get('/student/'+id)
    },
    getParents(branchid){
        return Api.get('/all-parents/'+branchid)
    },
    addParent(form){
        return Api.post('/parent/store/', form)
    },
    getSingleParent(id){
        return Api.get('/parent/'+id)
    },
    updateParent(id){
        return Api.put('/parent-update/'+id)
    },
    deleteParent(id){
        return Api.delete('/delete-parent/'+id)
    },
    assignWards(id){
        return Api.get('/parent/'+id)
    },
    saveWard(wards){
        return Api.post('/ward/store/', wards)
    },  
    getWards(parentid){
        return Api.get('/ward/'+parentid)
    },
    deleteward(id){
        return Api.put('/delete-ward/'+id)
    },    

    uploadImage(formData, config){
        return Api.post('/parentImage', formData, config)
    }
}
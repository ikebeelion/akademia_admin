import Api from './Api'


export default{
    getSubjects(branchid){
        return Api.get('/subjects/'+branchid)
    },
    getClassGroups(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    getSubjectGroup(branchid){
        return Api.get('/subjectGroup/'+branchid)
    },
    getSingleSubjectGroup(id){
        return Api.get('/singlesubjectgroup/'+id)
    },
    assignSubjectGroup(form){
        return Api.post('/subjectGroup/store', form)
    },
    updateSubjectGroup(id, form){
        return Api.put('/updateSubjectGroup/'+id, form)
    },
    deleteSubjectGroup(id){ 
        return Api.delete('/deleteSubjectGroup/'+id) 
    }, 
}
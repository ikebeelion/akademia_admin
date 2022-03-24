import Api from './Api'

export default{
    getSubjects(branchid){
        return Api.get('/subjects/'+branchid)
    },

    getSingleSubject(id){
        return Api.get('/singlesubject/'+id)
    },

    addSubject(form){
        return Api.post('/subject/store', form)
    },

    updateSubject(subjectid, form){
        return Api.put('/updateSubject/'+subjectid, form)
    },

    deleteSubject(subjectid){
        return Api.delete('/deleteSubject/'+subjectid)
    }
    

}
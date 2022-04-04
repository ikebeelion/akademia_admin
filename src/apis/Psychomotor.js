import Api from './Api'

export default {
    getPsychomotors(branchid){
        return Api.get('/psychomotors/'+branchid)
    },
    getSinglePsych(id){
        return Api.get('/singlepsych/'+id)
    },
    addPsychomotor(form){
        return Api.post('/psychomotors/store', form)
    },
    updatePsych(id, form){
        return Api.put('/updatepsych/'+id, form)
    },
    deletePsych(id){
        return Api.delete('/deletepsych/'+id)
    },
}
import Api from "./Api";

export default{                    
    addYear(form){
        return Api.post('/year/store', form)
    },
    addTerm(form){
        return Api.post('/term/store', form)
    },
    addSession(form){
        return Api.post('/session/store', form)
    },
    getSessions(branchid){
        return Api.get('/academicSessions'+branchid)
    },
    getTerm(branchid){
        return Api.get('/terms/'+branchid)
    },
    getYears(branchid){
        return Api.get('/academicYears/'+branchid)
    },
    addAcademicPeriod(form){
        return Api.post('/addAcademicPeriod', form)
    },
}
import Api from "./Api"

export default{
    getGroup(branchid){
        return Api.get('/classGroups/'+branchid)
    },
    
    sendSms(branchid, form){
        return Api.post('/sms/'+branchid, form)
    }
    
}
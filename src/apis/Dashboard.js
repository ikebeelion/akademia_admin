import Api from './Api'

export default{
    getStudentCount(schoolid){
        return Api.get('/getstudentcount/'+schoolid)
    }
}
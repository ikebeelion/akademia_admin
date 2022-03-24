
<template>
    <div>
        <h1>This is for {{ user.branchid }}</h1>
        <center>
            <p>The number of student in this school is {{studentCount}}</p>
        </center>
    </div>
</template>

<script>
import User from '../../src/apis/User.js'
import Dashboard from '../../src/apis/Dashboard.js'
export default {
    data() {
        return {
            user:[],
            studentCount:0,
            staffCount:0,
            parentCount:0
        }
    },
    methods: {
        getStudentCount(){
            Dashboard.getStudentCount(this.user.branch.schoolid).then((result) => {
                this.studentCount = result.data
            })
        }
    },  
    created() {
        User.auth().then((result)=>{
            this.user = result.data            
            this.getStudentCount()
        })

    }
}
</script>
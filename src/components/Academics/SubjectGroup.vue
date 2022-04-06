<template>
    <div>
    <center>            
            <button style="width:20%;" @click="assignSubject">View Subjects</button>
        </center>
    <section>
        <center>
            <div class="form-group">
                <label >Class Group</label>
                    <select v-model="newSubjectGroup.classgroup" @change="checkInput">
                        <option value="">Select</option>
                        <option v-for="group in classgroups" :key="group.id" :value="group.id">{{ group.classgroupname }}</option>
                    </select>
            </div>
            <div class="form-group">
                    <label >Subject</label>
                    <select v-model="newSubjectGroup.subject" @change="checkInput">
                        <option value="">Select</option>
                        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.subjecttitle }}</option>
                    </select>
            </div>
            <div class="form-group">
                <label >Credit Load</label>
                <input type="number" v-model="newSubjectGroup.load" @change="checkInput" placeholder="1">
            </div>

            <button @click.prevent=assignSubjectGroup v-if="!updateMode" :disabled="this.checkFilled == true">Assign</button>
            <button @click.prevent=updateSubjectGroup() v-if="updateMode">Update</button>
        </center>
    </section>
    <section style="margin-top:20px">
        <table id="all-subjects">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Class Group</th>
                    <th>Credit Load</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody :key="tableKey">
                <tr v-for="subjectGroup in subjectGroups" :key="subjectGroup.id">
                    <td><center>{{subjectGroup.subjecttitle}}</center></td>
                    <td><center>{{subjectGroup.classgroupname}}</center></td>
                    <td><center>{{subjectGroup.credit_load}}</center></td>
                    <td>
                        <button id="delete" @click="deleteSubjectGroup(subjectGroup.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button id="edit" @click="getSingleSubjectGroup(subjectGroup.id)">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>                 
</div>

</template>

<script>
import User from '../../apis/User.js'
import SubjectGroup from '../../apis/SubjectGroup.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                checkFilled:true,
                newSubjectGroup:{
                    subject:"",
                    classgroup:"",
                    load:"",
                },
                updateMode:false,
                user:null,
                subjects:[],
                classgroups:[],
                subjectGroups:[],
                subjgroupid:"",
                tableKey:0

            }
    },

    methods: {
        checkInput(){
            if(this.newSubjectGroup.subject != "" && this.newSubjectGroup.classgroup != ""){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

          assignSubject(){
            this.$router.push('/subjects')
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getSubjects()
                this.getClassGroups()
                this.getSubjectGroup()               
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        datatable(){            
            $(function() {
                 $('#all-subjects').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },

        getSubjects(){
            SubjectGroup.getSubjects(this.user.branchid).then((result) => {
                this.subjects = result.data                                
            })
        },

        getClassGroups(){
            SubjectGroup.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
            })
        },

        getSubjectGroup(){
            SubjectGroup.getSubjectGroup(this.user.branchid).then((result) => {
                this.subjectGroups = result.data
                this.datatable()
                this.tableKey++
            })
        },

        getSingleSubjectGroup(id){
            this.updateMode = true
            SubjectGroup.getSingleSubjectGroup(id).then((result) => {
                this.newSubjectGroup.subject =  result.data.subjectid
                this.newSubjectGroup.classgroup = result.data.classgroupid
                this.newSubjectGroup.load = result.data.credit_load
                this.subjgroupid = result.data.id
            })
        },

        assignSubjectGroup(){
            SubjectGroup.assignSubjectGroup(this.newSubjectGroup).then(() => {
                this.getSubjectGroup()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Subject Group Assigned',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Subject Group not Assigned',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        updateSubjectGroup(){
            SubjectGroup.updateSubjectGroup(this.subjgroupid , this.newSubjectGroup).then((result) => {
                this.getSubjectGroup()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Subject Group updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
            }).catch((err) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Subject Group not updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        deleteSubjectGroup(id){
             SubjectGroup.deleteSubjectGroup(id).then(() => {
                this.getSubjectGroup()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Room Group Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {});
        }
    },

    created() {
        this.getAuth()

    },

}
</script>

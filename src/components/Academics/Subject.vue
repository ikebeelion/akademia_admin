<template>
    <div>   
        <h1>Subjects</h1> 
        <center>            
            <button style="width:20%;" @click="assignSubject">Assign Class Room</button>
        </center>
    <section>
          <center>
                <div class="form-group">                                                                                                                        
                    <label for="">Subject</label>
                    <input  type="text" placeholder="..." v-model="newSubject.subjecttitle" @input="checkInput">                                                                        

                    <label for="">Alias <small>(optional)</small></label>
                    <input  type="text" placeholder="..." v-model="newSubject.subject_alias" @input="checkInput">                                           

                    <button  @click.prevent=addSubject v-if="!updateMode" :disabled="this.checkFilled == true">Add Subject</button>
                    <button  @click.prevent=updateSubject() v-if="updateMode">Update Subject</button>
                </div>                                 
            </center>
    </section>
           

            <section>
            <center >
                <h1>All Subjects</h1>
                    <p style="margin-bottom:20px">Listed Below are all the registered Subjects in this school</p>                                        
            </center>
            <table id="all-subjects">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Alias</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody :key="tableKey">
                    <tr v-for="subject in subjects" :key="subject.id">
                        <td>
                            <center>
                                {{subject.subjecttitle}}
                            </center>
                        </td>
                        <td>
                            <center>
                                {{subject.subject_alias}}
                            </center>
                        </td>
                        <td>
                            <button id="delete"  @click="deleteSubject(subject.id)">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button id="edit" @click="getSingleSubject(subject.id)">
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
import User from '../../apis/User'
import Subject from '../../apis/Subject'
import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:true,                
                newSubject:{
                    subjecttitle:'',
                    subject_alias:'',
                },
                subjectid:null,
                updateMode:false,
                subjects:[],    
                user:[],                               
                tableKey:0
            }
    },  
    methods: {
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getSubjects()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        assignSubject(){
            this.$router.push('/subjectgroup')
        },
        checkInput(){
            if(this.newSubject.subjecttitle != ''){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
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
            Subject.getSubjects(this.user.branchid).then((result) => {
                this.subjects = result.data
                this.datatable()           
                this.tableKey++     
                this.newSubject.subjecttitle = ''
                this.newSubject.subject_alias = ''
            })
        },
        getSingleSubject(id){
            this.updateMode = true
            Subject.getSingleSubject(id).then((result) => {
                this.newSubject.subjecttitle =  result.data.subjecttitle
                this.newSubject.subject_alias = result.data.subject_alias
                this.subjectid = result.data.id
            })
        },
        addSubject(){
            var post = [this.newSubject, this.user.branchid]
            Subject.addSubject(post).then(() => {                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Subject Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.getSubjects()                                  
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.response.data.errors[0][0],
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        updateSubject(){
            Subject.updateSubject(this.subjectid , this.newSubject).then(() => {
                this.getSubjects()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Subject Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.response.data.errors[0][0],
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        deleteSubject(id){
             Subject.deleteSubject(id).then(() => {
                this.getSubjects()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Subject Removed',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        }
    },
    created() {
        this.getAuth()
    },
   

}
</script>
<style scoped>
    .form-group{
        margin-top: 5%;
        margin-bottom: 5%;
    }

    #all-subjects{
        margin-top: 20px;
    }

</style>
<template>
    <div>  
        <TransitionGroup name="content">
            <h1>Class Groups</h1>      
            <section>
            <center>
                <div class="form-group">
                        <label>Class Groups</label>
                        <input type="text" placeholder="..." v-model="newClassGroup.classgroupname" @input="checkInput">
                    </div>
                    <button  @click.prevent=addClassGroup v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
                    <button  @click.prevent=updateGroup() v-if="updateMode">Update</button>                                            
                </center>
            </section>
            <section style="margin-top:50px">
                <center>
                    <h1>All Class Groups</h1>
                    <p>Listed Below are all the registered class groups in this school</p>
                    <table id="all-classgroups">
                        <thead>
                            <tr>
                                <th>Class Group</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody :key="tableKey">
                            <tr v-for="classGroup in classgroups" :key="classGroup.id">
                                <td><center>{{classGroup.classgroupname}}</center></td>
                                <td>
                                    <button id="delete" @click="deleteGroup(classGroup.id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button id="edit" @click="getSingleGroup(classGroup.id)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </center>

            </section>
        </TransitionGroup>
    </div>
</template>

<script>
import User from '../../apis/User'
import ClassGroup  from '../../apis/ClassGroups'
import Swal from 'sweetalert2'
export default {
    inject:['baseURL', 'user'],    
    data() {
        return {
                checkFilled:true,
                newClassGroup:{
                    classgroupname:'',
                },
                groupid:null,
                updateMode:false,
                classgroups:[],
                tableKey:0
            }
    },

    methods: {
        checkInput(){
            if(this.newClassGroup.classgroupname != ''){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getClassGroups()
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        datatable(){            
            $(function() {
                 $('#all-classgroups').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },

        getClassGroups(){
            ClassGroup.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
                this.tableKey++
                this.datatable()            
                this.newClassGroup.classgroupname = ''
            })
        },
        getSingleGroup(id){
            this.updateMode = true
            ClassGroup.getSingleGroup(id).then((result) => {
                this.newClassGroup.classgroupname =  result.data.classgroupname
                this.groupid = result.data.id
            })
        },

        addClassGroup(){
            var post = [this.newClassGroup, this.user.branchid]
            ClassGroup.addClassGroup(post).then(() => {
                this.getClassGroups()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Group Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
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

        updateGroup(){
            ClassGroup.updateGroup(this.groupid, this.newClassGroup).then(() => {
                this.getClassGroups()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Class Group Updated',
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

        deleteGroup(id){
             ClassGroup.deleteGroup(id).then(() => {
                this.getClassGroups()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Group Deleted',
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


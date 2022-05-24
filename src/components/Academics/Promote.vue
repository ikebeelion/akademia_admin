<template>
    <div>
        <TransitionGroup name="content">
            <h1>Promote Students</h1>
            <section style="margin-top:50px">
                <div class="form-group">
                    <center>
                        <!-- getclassroom -->
                        <label for="">Classroom</label>
                        <select v-model="promoteStudents.oldclassroom">
                            <option value="null">Select Classroom</option>
                            <option :value="room.id" v-for="room in classrooms" :key="room">
                                {{ room.classgroupname }} - {{ room.classroom }}
                            </option>
                        </select>
                    </center>
                </div>
                <div class="form-group">
                    <center>
                        <!-- getclassroom -->
                        <label for="">New or Old Promotion</label>
                        <select @change="getStudents()" v-model="status">
                            <option value="null">Select Status</option>
                            <option value="old">Old</option>
                            <option value="new">New</option>                            
                        </select>
                    </center>
                </div>
                <div class="form-group">
                    <center>
                        <!-- getclassroom -->
                        <label for="">New Class Room</label>
                        <select v-model="promoteStudents.newclassroom">
                            <option value="null">Select Classroom</option>
                            <option :value="room.id" v-for="room in classrooms" :key="room">
                                {{ room.classgroupname }} - {{ room.classroom }}
                            </option>
                        </select>
                    </center>
                </div>
                <div class="form-group">
                    <center>
                        <!-- getclassroom -->
                        <label for="">Date</label>
                        <input type="date" v-model="promoteStudents.date">
                    </center>
                </div>
                <center>
                    <button @click="promote" :disabled="promoteStudents.students == []">
                    Promote to next class</button>
                </center>
            </section>
            <center>
                <section style="margin-top:55px">
                    <table id="promote-table">
                        <thead>
                            <tr>
                                <th>
                                    <center>
                                        Select All<input type="checkbox" @click="addAll()" :checked="selectall">
                                    </center>
                                </th>
                                <th>Firstname</th>
                                <th>Lastname</th>  
                                <th>Othername(s)</th>                  
                                <th>Promotion Status</th>
                            </tr>                    
                        </thead>
                        <tbody :key="tableKey">
                            <tr v-for="student in students" :key="student">
                                <td>    
                                    <center>
                                        <input type="checkbox" v-model="promoteStudents.students" :value="{
                                            id:student.studentuseraccountid, firstname:student.firstname, lastname:student.lastname
                                        }">
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        {{student.firstname}}
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        {{student.lastname}}
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        {{student.othername}}
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        {{student.promotion_status}}
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </center>
        </TransitionGroup>
    </div>
</template>

<script>
import User from '../../apis/User.js'
import Promote from '../../apis/Promote.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            user:null,
            classrooms:null,
            promoteStudents:{
                oldclassroom:null,
                newclassroom:null,
                students:[],
                date:null
            },
            status:null,
            students:null,
            selectall:false,
            tableKey:0
        }
    },

    methods: {
        promote(){            
            if(this.promoteStudents.students.length > 0){
                if(this.promoteStudents.oldclassroom != this.promoteStudents.newclassroom){
                    Promote.promoteStudents(this.promoteStudents).then((result) => {
                         this.promoteStudents.oldclassroom = null
                         this.promoteStudents.newclassroom = null
                         this.promoteStudents.students = []
                         this.students = []
                         this.promoteStudents.date = null
                         this.selectall = false
                         Swal.fire({
                             position: 'top-end',
                             icon: 'success',
                             title: 'Promoted Successfully',
                             customClass: 'Swal-wide',
                             showConfirmButton: false,
                             timer: 3000
                         })
                     }).catch((err) => {
                         Swal.fire({
                             position: 'top-end',
                             icon: 'error',
                             title: 'error',
                             customClass: 'Swal-wide',
                             showConfirmButton: false,
                             timer: 3000
                         })
                     }); 
                }else{
                    Swal.fire({
                             position: 'top-end',
                             icon: 'error',
                             title: 'Old classroom and new classroom cannot be the same',
                             customClass: 'Swal-wide',
                             showConfirmButton: false,
                             timer: 3000
                         })
                }
            }else{
                Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: "No student is being promoted",
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }
            
        },

         datatable(){            
            $(function() {
                 $('#promote-table').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getClassRoomGroups(){
            Promote.getClassRooms(this.user.branchid).then((result) => {
                this.classrooms = result.data
            })
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                                 
                this.getClassRoomGroups()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        getStudents(){
            Promote.getStudentsInRoom(this.promoteStudents.oldclassroom).then((result) => {
                var students = []
                result.data.forEach(element => {
                    if(element.promotion_status == this.status){
                        students.push(element)
                    }
                });
                this.students = students
                this.datatable()
                this.tableKey++
            })
        },
        addAll(){
            if(this.selectall){
                this.selectall = false
                this.promoteStudents.students = []
            }else{             
                this.selectall = true
                this.students.forEach(student => {                
                    this.promoteStudents.students.push(
                         {id:student.studentuseraccountid, firstname:student.firstname, lastname:student.lastname}
                     )
                });
            }
            //  = student;
        }
    },
    created() {
        this.getAuth()
    },
}
</script>
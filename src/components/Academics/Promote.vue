<template>
    <div>
        <h1>Promote Students</h1>
        <section style="margin-top:50px">
            <div class="form-group">
                <center>
                    <!-- getclassroom -->
                    <label for="">Classroom</label>
                    <select @change="getStudents()" v-model="promoteStudents.oldclassroom">
                        <option value="">Select Classroom</option>
                        <option :value="room.id" v-for="room in classrooms" :key="room">
                            {{ room.classgroupname }} - {{ room.classroom }}
                        </option>
                    </select>
                </center>
            </div>
            <div class="form-group">
                <center>
                    <!-- getclassroom -->
                    <label for="">New Class Room</label>
                    <select v-model="promoteStudents.newclassroom">
                        <option value="">Select Classroom</option>
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
        <section style="margin-top:55px">
            <table>
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
                    </tr>                    
                </thead>
                <tbody>
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
                    </tr>
                </tbody>
            </table>
        </section>
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
                oldclassroom:"",
                newclassroom:"",
                students:[],
                date:""
            },
            students:null,
            selectall:false,
        }
    },

    methods: {
        promote(){
            Promote.promoteStudents(this.promoteStudents).then((result) => {
                this.promoteStudents.oldclassroom = ""
                this.promoteStudents.newclassroom = ""
                this.students = []
                this.date = ""
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Students Promoted to next class',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Not Promoted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
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
                this.students = result.data                
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
<template>
    <div>
        <TransitionGroup name="content">
            <h1>Class Rooms</h1>
            <center>            
                <button style="width:20%;" @click="assignRoom">Assign Class Room</button>
            </center>
            <section>
                <center>
                    <div class="form-group">
                        <label>Class Rooms</label>
                        <input type="text" placeholder="..." v-model="newClassRoom.classroom" @input="checkInput">
                    </div>
                    <button @click.prevent=addClassRoom v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
                    <button @click.prevent=updateRoom() v-if="updateMode">Update</button>                                        
                </center>
            </section>        
            <section style="margin-top:50px">
                <center>
                    <h1>All Class Rooms</h1>
                        <p>Listed Below are all the registered class Rooms in this school</p>
                            <table id="all-classrooms">
                                    <thead>
                                        <tr>
                                            <th>Class Room</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                            <tbody :key="tableKey">
                                                <tr v-for="classRoom in classRooms" :key="classRoom.id">
                                                    <td>
                                                        <center>
                                                            {{classRoom.classroom}}
                                                        </center> 
                                                    </td>
                                                    <td>
                                                        <button id="delete" @click="deleteRoom(classRoom.id)">
                                                            <i class="fas fa-trash"></i>
                                                        </button>
                                                        <button id="edit" @click="getSingleRoom(classRoom.id)">
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
import User from '../../apis/User.js'
import ClassRoom from '../../apis/ClassRoom.js'
import Swal from 'sweetalert2'
import RoomGroup from './ClassromGroups.vue'
export default {
    component:[RoomGroup],
    data() {
        return {
                checkFilled:true,
                addClsRoom:true,
                assignClassRoom:false,
                newClassRoom:{
                    classroom:null,
                },
                roomid:null,
                updateMode:false,
                classRooms:[],
                user:null,
                tableKey:0
            }
    },

    methods: {
        checkInput(){
            if(this.newClassRoom.classroom != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        addRoom(){
            this.assignClassRoom = false
            this.addClsRoom = true
        },
        assignRoom(){
            this.$router.push('/room-group')
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getClassRooms()
               
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        datatable(){            
            $(function() {
                 $('#all-classrooms').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },

        getClassRooms(){
            ClassRoom.getClassRooms(this.user.branchid).then((result) => {
                this.classRooms = result.data
                this.datatable()
                this.tableKey ++   
                this.newClassRoom.classroom = ''             
            })
        },
        getSingleRoom(id){
            this.updateMode = true
            ClassRoom.getSingleRoom(id).then((result) => {
                this.newClassRoom.classroom =  result.data.classroom
                this.roomid = result.data.id                
            })
        },



        addClassRoom(){
            var post = [this.newClassRoom, this.user.branchid]
            ClassRoom.addClassRoom(post).then(() => {
                this.getClassRooms()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Room Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: err.response.data.errors[0][0],
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        updateRoom(){
            ClassRoom.updateRoom(this.roomid , this.newClassRoom).then(() => {                
                this.getClassRooms()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Room Updated',
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

        deleteRoom(id){
             ClassRoom.deleteRoom(id).then(() => {
                this.getClassRooms()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Room Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });

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

    #all-classrooms{
        margin-top: 20px;
    }

</style>

<template>
    <div>
        <section style="margin-bottom:20px">
            <center>
                <div class="form-group">
                    <label>Class Group</label>
                        <select v-model="newClassRoomGroup.classgroup" @change="checkInput">
                            <option value="">Select</option>
                            <option v-for="group in classgroups" :key="group.id" :value="group.id">{{ group.classgroupname }}</option>
                        </select>
                </div>
                <div class="form-group">
                    <label>Class Room</label>
                        <select v-model="newClassRoomGroup.classroom" @change="checkInput">
                                <option value="">Select</option>
                                <option v-for="room in classrooms" :key="room.id" :value="room.id">{{ room.classroom }}</option>
                        </select>
                </div>
                <button @click.prevent=assignClassRoomGroup v-if="!updateMode" :disabled="this.checkFilled == true">Assign</button>
                <button @click.prevent=updateRoomGroup v-if="updateMode">Update</button>            
            </center>
        </section>
        <section>
            <table id="all-roomgroups">
                <thead>
                    <tr>
                        <th>Class Room</th>
                        <th>Class Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody :key="tableKey">
                    <tr v-for="classRoomGroup in roomGroups" :key="classRoomGroup.id">
                        <td>
                            <center>
                                {{classRoomGroup.classroom}}
                            </center>
                        </td>
                        <td>
                            <center>
                                {{classRoomGroup.classgroupname}}
                            </center>
                        </td>
                        <td>
                            <button id="delete" @click="deleteRoomGroup(classRoomGroup.id)">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button id="edit" @click="getSingleClassRoomGroup(classRoomGroup.id)">
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
    import RoomGroup from '../../apis/ClassroomGroups'
    import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:true,
                newClassRoomGroup:{
                    classroom:"",
                    classgroup:""
                },
                updateMode:false,
                user:null,
                crmgroupid:null,
                classrooms:[],
                classgroups:[],
                roomGroups:[],
                tableKey:0

            }
    },

    methods: {
        checkInput(){
            if(this.newClassRoomGroup.classroom != null && this.newClassRoomGroup.classgroup != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

        datatable(){            
            $(function() {
                 $('#all-roomgroups').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getClassRooms()
                this.getClassGroups()
                this.getClassRoomGroup()
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        getClassRooms(){
            RoomGroup.getClassRooms(this.user.branchid).then((result) => {
                this.classrooms = result.data
            })
        },

        getClassGroups(){
            RoomGroup.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
            })
        },

        getClassRoomGroup(){
            RoomGroup.getClassRoomGroup(this.user.branchid).then((result) => {
                this.roomGroups = result.data
                this.datatable()
                this.tableKey++                           
            })
        },

        getSingleClassRoomGroup(id){
            RoomGroup.getSingleClassRoomGroup(id).then((result) => {
                this.updateMode = true
                this.newClassRoomGroup.classroom =  result.data.classroomid
                this.newClassRoomGroup.classgroup = result.data.classgroupid
                this.crmgroupid = result.data.id
            })
        },

        assignClassRoomGroup(){
            RoomGroup.assignClassRoomGroup(this.newClassRoomGroup).then(() => {                
                this.getClassRoomGroup()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Room Group Assigned',
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

        updateRoomGroup(){
            RoomGroup.updateRoomGroup(this.crmgroupid , this.newClassRoomGroup).then(() => {
                this.getClassRoomGroup()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class Room Group updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
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

        deleteRoomGroup(id){
             RoomGroup.deleteRoomGroup(id).then(() => {
                this.getClassRoomGroup()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Room Group Deleted',
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
        
    },

    created() {        
        this.getAuth()       
    },

}
</script>

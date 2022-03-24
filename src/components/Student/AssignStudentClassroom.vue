<template>
    <div>
        <h1>Assign Student To Class Room</h1>       
        <center>
            <div class="form-group-row">
                <div class="form-group" v-if="studentData != null">
                    <label for="">Current Class Group</label>
                    <input type="text" readonly v-model="studentData[0].class_group.classgroupname">
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="">Select Class Room</label>
                    <select v-model="newClassDetails.classroom" @change="addGroup">
                        <option value="">Select Classroom</option>
                        <option v-for="classRoom in classRooms" :value="classRoom.id" :key="classRoom.id">
                            {{ classRoom.class_room.classroom }}
                        </option>
                    </select>
                </div>
            </div>
        </center>
        <center>
            <button @click.prevent="addStudentToClassRoom">Add Student To Class</button>
        </center>         
</div>
</template>

<script>
import Student from '../../apis/Student.js'
import Swal from 'sweetalert2'
export default {
    props:{
        studentid:null,       
    },    
    data() {
        return {
                user:null,                
                studentData:null,
                classRooms:null,
                newClassDetails:{
                    student:null,
                    classroom:null
                }
            }
    },
    methods: {
        addGroup(){
            this.newClassDetails.student = this.studentid
        },
        addStudentToClassRoom(){
            Student.addStudentToClassRoom(this.newClassDetails).then((result) => {
                   Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Classroom is set',
                    customClass: 'swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.studentData = null
                this.$emit('showProfile')
            }).catch((err) => {
                   Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Did not Assign',
                    customClass: 'swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        addIdToStorage(){
            var studentid = null
            if(localStorage.getItem('studentid')){
                studentid = JSON.parse(localStorage.getItem('studentid'))
                }
                if(this.$route.params.id != ''){
                    studentid = this.$route.params.id
                    localStorage.setItem('studentid', JSON.stringify(studentid));
                }
        },
        getSingleStudent(){
            Student.getStudentSingle(this.$props.studentid).then((result) => {
                   this.studentData = result.data
                Student.yearclassroom(this.studentData[0].yearid).then((result) => {
                    this.classRooms = result.data
                })
            })
        },
    },
    mounted() {
        console.log('mounted:'+this.$props.studentid)
    },
    created(){
        console.log('created:'+this.$props.studentid)
        this.getSingleStudent()
    },
    watch:{
        studentid(){
            console.log('watch:'+this.$props.studentid)
            
        }
    }
}
</script>
<style scoped>
    .form-group-row{
		display: flex;
        position: relative;
        justify-content: center;        
	}

    .form-group-row input, select{
        position:relative ;
        width: 300px;
        margin-right: 10px;
    }

    .img-container{
        max-width: 100px;
        max-height: 100px;
        border-radius: 10%;        
        overflow: hidden;
    }   
    .img-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width:992px) {
    .form-group-row{
		display: block;
        position: relative;        
	}
            
    }
</style>


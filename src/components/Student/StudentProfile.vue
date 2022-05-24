<template>
     <div>
        <TransitionGroup name="content">
            <h1>Student Profile</h1>
            <center style="margin-bottom:20px">
                <button style="width:20%; margin-right:5%; margin-bottom:5%" @click="studentProfile">Create Profile</button>                                     
                <div v-if="updateMode==true && !assClassRoom">
                    <h6>Student Class Room:</h6>
                        <p v-show="studentClassRoom.classgroupname">
                            {{this.studentClassRoom.classgroupname+' '+this.studentClassRoom.classroom}}
                        </p>
                        <p v-show="!studentClassRoom.classgroupname">
                            Class Room Not Assigned
                        </p>
                </div>
            </center>                   
            <!-- create profile -->
            <section v-if="createProfile && !assClassRoom">
                <center style="margin-bottom:20px;" >
                    <div class="img-container" style="margin-bottom:10px">
                        <img :src="'http://localhost:8000/images/students/'+this.newStudent.photo" alt="student photo">                    
                    </div>
                    <div v-if="step==1" >
                        <div class="form-group-row">
                            <div class="form-group">
                                <label>Firstname</label>
                                <input @change="checkInput" v-model="newStudent.firstname" type="text" placeholder="...">
                            </div>
                            <div class="form-group">
                                <label>Lastname</label>
                                <input @change="checkInput" v-model="newStudent.lastname" type="text" placeholder="...">
                            </div>
                            <div class="form-group">
                                <label>Othername(s)</label>
                                <input @change="checkInput" v-model="newStudent.othernames" type="text" placeholder="...">
                            </div>
                            </div>
                            <div class="form-group-row">
                                        <div class="form-group">
                                            <label>Date of Birth</label>
                                            <input @change="checkInput" v-model="newStudent.dob" type="date" placeholder="...">
                                        </div>
                                        <div class="form-group">
                                            <label>Gender</label>
                                            <select v-model="newStudent.genderid" @change="checkInput">
                                                <option value="null">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Religion</label>
                                            <select v-model="newStudent.religion" @change="checkInput">
                                                <option value="null">Select Religion</option>
                                                <option value="christian">Christian</option>
                                                <option value="islam">Islam</option>
                                            </select>
                                        </div>
                                        
                            </div>      
                                                
                    </div>
                    <div v-if="step==2" >
                        <div class="form-group-row">
                            <div class="form-group">
                                <label>Nationality <span class="text-danger">*</span></label>
                                    <select v-model="newStudent.nationalityid" @change="getStateofO(newStudent.nationalityid)">
                                        <option value="null">Select Nationlity</option>
                                        <option v-for="country in countries"  :value="country.id" :key="country.id"> {{ country.country   }}</option>
                                    </select>
                            </div>
                            <div class="form-group">
                                <label>State of Origin <span class="text-danger">*</span></label>
                                <select v-model="newStudent.stateoforiginid" @change="checkInput" >
                                    <option value="null">Select State of Origin</option>
                                    <option v-for="statee in stateofo" :value="statee.id" :key="statee.id" >{{statee.state}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>L.G.A</label>
                                <input @change="checkInput" v-model="newStudent.local_govt_area" type="text" placeholder="...">
                            </div>
                        </div>
                        <div class="form-group-row">
                            <div class="form-group">
                                <label>Address</label>
                                <textarea @change="checkInput" v-model="newStudent.address" cols="100" rows="2" placeholder="..."></textarea>
                            </div>
                        </div>
                        <div class="form-group-row">
                            <div class="form-group">
                            <label>Country </label>
                            <select v-model="newStudent.countryid" @change="getState(newStudent.countryid)">
                                <option value="null">Select Country</option>
                                <option  v-for="country in countries" :value="country.id" :key="country.id"> {{ country.country   }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>State</label>
                            <select v-model="newStudent.stateid" @change="getCity(newStudent.stateid)">
                                <option value="null">Select State</option>
                                <option v-for="statee in states" :value="statee.id" :key="statee.id">{{statee.state}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>City</label>
                            <select v-model="newStudent.cityid" @change="checkInput">
                                <option value="null">Select City</option>
                                <option v-for="city in cities" :value="city.id" :key="city.id" >{{ city.city }}</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div v-if="step==3" >
                    <div class="form-group-row">
                        <div class="form-group">
                            <label>Enrollement Date</label>
                            <input @change="checkInput" v-model="newStudent.enrollmentdate" type="month" placeholder="...">
                        </div>                                    
                        <div class="form-group">
                            <label>Contact Email Address</label>
                            <input @change="checkInput" v-model="newStudent.contactemail" type="email" placeholder="...">
                        </div>
                    </div>
                    <div class="form-group-row">
                        <div class="form-group">
                            <label>Contact Telephone</label>
                            <input @change="checkInput" v-model="newStudent.contacttel" type="text" placeholder="...">
                        </div>
                        <div class="form-group">
                            <label>Class Group</label>
                            <select v-model="newStudent.yearid" @change="getRoomGroups()">
                                <option value="null">Select Class Group</option>
                                <option v-for="group in classgroups" :key="group.id" :value="group.id">{{ group.classgroupname }}</option>
                            </select>
                        </div>
                                                            <div class="form-group">
                                            <label>Classroom</label>
                                            <select v-model="newStudent.classroom" >
                                                <option v-for="group in classrooms" :key="group.id" :value="group.id">
                                                    {{ group.classgroupname }} {{ group.classroom }}
                                                </option>
                                            </select>
                                        </div> 
                        
                    </div>
                    <div class="form-group-row">
                    <div class="form-group">
                            <label>Student Image  <small style="color:red">maximum file upload size(2mb)</small></label>    
                            <input @change="pickFile" type="file" placeholder="...">
                        </div>
    
                                </div> 
                </div>
                    <button @click.prevent="prevStep" v-if="this.step > 1">Previous</button>
                    <button @click.prevent="nextStep" v-if="this.step != this.totalsteps && this.checkFilled == false">Next</button>
                    <button @click.prevent="addStudent" v-if="this.step == this.totalsteps && this.updateMode == false">Add New Student</button>
                    <button @click.prevent="updateStudent" v-if="this.step == this.totalsteps && this.checkFilled == false && this.updateMode == true">Update Student</button>
                </center>

            </section>
            <section v-if="assClassRoom">
                <class-assign :studentid="selectedid" @showProfile="studentProfile" />            
            </section>
            <section v-if="!assClassRoom" >                 
                <h1>All Students</h1>
                <center> 
                    <p>Listed Below are all the registered students in this school</p>                
                    <table id="my-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Class Group</th>
                                <th>Enrollment Date</th>
                                <th>Gender</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody :key="tableKey">
                            <tr v-for="student in students" :key="student.id">
                                <td>{{student.firstname}}</td>
                                <td>{{student.lastname}}</td>
                                <td>{{student.class_group.classgroupname}}</td>
                                <td>{{student.enrollmentdate}}</td>
                                <td>{{student.genderid}}</td>
                                <td>
                                    <button  style="width:50px"    id="delete" @click.prevent="deleteStudent(student.id)" data-toggle="tooltip" data-placement="top" title="Disable Student Profile">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button  style="width:50px"    id="edit" @click.prevent="getSingleStudent(student.id)" data-toggle="tooltip" data-placement="top" title="Update Student Profile">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <!-- <button style="background:orange; margin-top:2%; margin-right:5%" @click.prevent="getStudentAcademicRecord(student.studentuseraccountid)" data-toggle="tooltip" data-placement="top" title="See Student Records">
                                        <i class="fas fa-chart-line"></i>
                                    </button> -->
                                    <button style="width:50px; background:grey; margin-top:2%; margin-right:5%" @click.prevent="assignClassRoom(student.studentuseraccountid)" data-toggle="tooltip" data-placement="top" title="Assign Classrooms">
                                        <i class="fas fa-chalkboard"></i>
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
import Swal from 'sweetalert2'
import User from '../../apis/User.js'
import Student from '../../apis/Student'
import ClassAssign from './AssignStudentClassroom.vue'
export default {
    components:{ClassAssign},
    data() {
        return {
                checkFilled:true,
                classrooms:null,
                createProfile:false,
                assClassRoom:false,
                newStudent:{
                    firstname:null,
                    lastname:null,
                    othernames:null,
                    dob:null,
                    genderid:null,
                    religion:null,
                    nationalityid:null,
                    stateoforiginid:null,
                    local_govt_area:null,
                    address:null,
                    countryid:null,
                    stateid:null,
                    cityid:null,
                    enrollmentdate:null,
                    contactemail:null,
                    contacttel:null,
                    yearid:null,
                    photo:null,
                    branchid:null,
                    classroom:null

                },
                updateMode:false,
                countries:null,
                states:null,
                stateofo:null,
                cities:null,
                user:null,
                step:1,
                totalsteps:3,
                classgroups:null,
                image:null,
                students:null,
                studentuserid:null,
                profileid:null,
                studentClassRoom:null,
                selectedid:null,
                tableKey:0,

            }
    },

    methods: {
        getRoomGroups(){
            Student.getRoomGroup(this.newStudent.yearid).then((result) => {
                this.classrooms = result.data
            }).catch((err) => {
            
            });
        },
        studentProfile(){
            this.createProfile = !this.createProfile            
            this.assClassRoom = false
            this.updateMode = false
             this.newStudent.firstname =  null
                    this.newStudent.lastname =  null
                    this.newStudent.othernames =  null
                    this.newStudent.dob =  null
                    this.newStudent.genderid =  null
                    this.newStudent.religion =  null
                    this.newStudent.nationalityid =  null
                    this.newStudent.stateoforiginid =  null
                    this.newStudent.local_govt_area =  null
                    this.newStudent.address =  null
                    this.newStudent.countryid =  null
                    this.newStudent.stateid =  null
                    this.newStudent.cityid =  null
                    this.newStudent.enrollmentdate =  null
                    this.newStudent.contactemail =  null
                    this.newStudent.contacttel = null
                    this.newStudent.yearid =  null
                    this.newStudent.photo =  null
                    this.profileid =  null
                    this.studentuserid = null
                    this.step = 1
                    this.datatable()
        },
        nextStep(){
            if(this.updateMode == true){
                this.checkFilled = false
            }else {
                this.checkFilled=true
            }
            this.step++
        },
        checkInput(){
            if(this.step == 1 && this.newStudent.firstname != null && this.newStudent.lastname != null && this.newStudent.dob != null && this.newStudent.genderid != null && this.newStudent.religion != null)
            {
                this.checkFilled = false
            }else if(this.step == 2 && this.newStudent.countryid != null && this.newStudent.stateid != null && this.newStudent.cityid != null && this.newStudent.local_govt_area != null && this.newStudent.address != null && this.newStudent.nationalityid != null && this.newStudent.stateoforiginid){
                this.checkFilled = false
            }else if(this.step == 3 && this.newStudent.enrollmentdate != null && this.newStudent.contactemail != null && this.newStudent.contacttel != null && this.newStudent.yearid != null){
                this.checkFilled = false
            }else if(this.step == this.totalsteps){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        prevStep(){
            this.checkInput()
            this.step--
        },
        getClassGroups(){
            Student.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
            })
        },
        getCountry(){
            Student.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            Student.getState(countryid).then((result) => {
                this.states = result.data
            })
        },
        getStateofO(countryid){
            Student.getStateofO(countryid).then((result) => {
                this.stateofo = result.data
            })
        },
        getCity(stateid){
             Student.getCity(stateid).then((result) => {
                this.cities = result.data
            })
        },
          checkTelInput(){
          var tel = this.newStudent.contacttel
           if(tel != "" && tel.length < 14 || tel.length > 14){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Check if telephone has a valid length',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                })                
                this.error = true
            }else{
                this.error = false
            }
        },
        pickFile(e){        
            if(e.target.files[0]['size'] < 2111775){
                this.selectedfile = e.target.files[0]     
                const config = {
                    headers:{'content-type':'multipart/form-data'}
                }
                var formData = new FormData()
                formData.append('file',this.selectedfile)
                Student.uploadImage(formData, config).then((result) => {
                    this.newStudent.photo = result.data            
                }).catch(() => {});
            }else{
                Swal.fire({
                            icon: 'warning',
                            title: 'Oooops',
                            text: 'You are uploading a file larger than 2mb'
                            })                
            }
        },
        getStudents(){
            Student.getStudents(this.user.branchid).then((result) => {
                this.students = result.data 
                this.datatable() 
                this.getSingleStudent()               
            })
        },
        addStudent(){
            ////this.checkTelInput()
            Student.addStudent(this.newStudent).then(() => {
                  this.getStudents()
                  this.tableKey++
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Profile Created',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.newStudent.firstname =  null
                    this.newStudent.lastname =  null
                    this.newStudent.othernames =  null
                    this.newStudent.dob =  null
                    this.newStudent.genderid =  null
                    this.newStudent.religion =  null
                    this.newStudent.nationalityid =  null
                    this.newStudent.stateoforiginid =  null
                    this.newStudent.local_govt_area =  null
                    this.newStudent.address =  null
                    this.newStudent.countryid =  null
                    this.newStudent.stateid =  null
                    this.newStudent.cityid =  null
                    this.newStudent.enrollmentdate =  null
                    this.newStudent.contactemail =  null
                    this.newStudent.contacttel = null
                    this.newStudent.yearid =  null
                    this.newStudent.photo =  null
                    this.profileid =  null
                    this.studentuserid = null
                    this.step = 1
            }).catch(() => {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error Adding Profile',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        getSingleStudent(id){
            Student.getSingleStudent(id).then((result) => {
                    this.newStudent.firstname = result.data[0]['firstname']
                    this.newStudent.lastname = result.data[0]['lastname']
                    this.newStudent.othernames = result.data[0]['othernames']
                    this.newStudent.dob = result.data[0]['dob']
                    this.newStudent.genderid = result.data[0]['genderid']
                    this.newStudent.religion = result.data[0]['religion']
                    this.newStudent.nationalityid = result.data[0]['nationalityid']
                    this.newStudent.stateoforiginid = result.data[0]['stateoforiginid']
                    this.newStudent.local_govt_area = result.data[0]['local_govt_area']
                    this.newStudent.address = result.data[0]['address']
                    this.newStudent.countryid = result.data[0]['countryid']
                    this.newStudent.stateid = result.data[0]['stateid']
                    this.newStudent.cityid = result.data[0]['cityid']
                    this.newStudent.enrollmentdate = result.data[0]['enrollmentdate']
                    this.newStudent.contactemail = result.data[0]['contactemail']
                    this.newStudent.contacttel = result.data[0]['contacttel']
                    this.newStudent.yearid = result.data[0]['yearid']
                    this.newStudent.classroom = result.data[0]['classid']
                    this.newStudent.photo = result.data[0]['photo']
                    this.profileid = result.data[0]['id']
                    this.studentuserid = result.data[0]['studentuseraccountid']
                    if(result.data != ''){
                        this.checkFilled = false
                        this.updateMode = true
                        this.updateFetch()
                    }
                    this.createProfile = true;
                    this.getStudentClassRoom()
            })
        },
        updateStudent(){
            Student.updateStudent(this.profileid, this.newStudent).then((result) => {
                 this.getStudents()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Profile Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
                this.newStudent.firstname =  null
                    this.newStudent.lastname =  null
                    this.newStudent.othernames =  null
                    this.newStudent.dob =  null
                    this.newStudent.genderid =  null
                    this.newStudent.religion =  null
                    this.newStudent.nationalityid =  null
                    this.newStudent.stateoforiginid =  null
                    this.newStudent.local_govt_area =  null
                    this.newStudent.address =  null
                    this.newStudent.countryid =  null
                    this.newStudent.stateid =  null
                    this.newStudent.cityid =  null
                    this.newStudent.enrollmentdate =  null
                    this.newStudent.contactemail =  null
                    this.newStudent.contacttel = null
                    this.newStudent.yearid =  null
                    this.newStudent.classroom = null
                    this.newStudent.photo =  null
                    this.profileid =  null
                    this.studentuserid = null

            }).catch((err) => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error Updating Profile',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })

            });
        },
        deleteStudent(id){
            Student.deleteStudent(id).then((result) => {
                this.getStudents()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student Profile Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error Deleting Profile',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        assignClassRoom(id){
            this.selectedid = id
            this.assClassRoom = !this.assClassRoom
            // this.createProfile = false
        },

        getStudentClassRoom(){
            Student.getStudentClassRoom(this.studentuserid).then((result) => {
                this.studentClassRoom = result.data
            })
        },
        updateFetch(){
            this.getState(this.newStudent.countryid)
            this.getCity(this.newStudent.stateid)
            this.getStateofO(this.newStudent.nationalityid)            
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.newStudent.branchid = this.user.branchid
                this.getClassGroups()
                this.getStudents()                                
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#my-table').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
    },

    created() {
        this.getCountry()
        this.getAuth()

    },

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


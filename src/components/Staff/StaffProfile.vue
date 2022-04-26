<template>
     <div>
        <h1>Staff Profile</h1>
        <center style="margin-bottom:20px">
            <button style="width:20%; margin-right:5%; margin-bottom:5%" @click="staffProfile">Create Profile</button>                                     
        </center>                   
        <!-- create profile -->
        <section v-if="createProfile">
            <center style="margin-bottom:20px;" >
                <div class="img-container" style="margin-bottom:10px">
                    <img :src="'http://localhost:8000/images/staff/'+this.newStaff.photo" alt="staff photo">                    
                </div>
                <div v-if="updateMode">
                                    <h5>Subject Taught</h5>
                   <div v-show="subjectstaught != ''" v-for="sub in subjectstaught" :key=sub.id>
                        <a href="#"> {{sub.subjecttitle}} - {{sub.classgroupname}}</a>
                               <small style="margin-left:5%; background:red; cursor:pointer">
                                    <a ref="#" style="color:white"  @click="deleteTutorSubject(sub.id)">Delete</a>
                                </small>
                    </div>
                <div v-show="subjectstaught == ''">
                    <p>Not Handling any Subject</p>
                </div>
                <hr>
                <h5>Class Room Managed</h5>
                    <div v-show="classroomsmgd != ''" v-for="sub in classroomsmgd" :key=sub.id>
                        <a href="#"> {{sub.classgroupname}} - {{sub.classroom}}</a>
                        <small style="margin-left:5%; background:red; cursor:pointer">
                             <a ref="#" style="color:white"  @click="deleteclassroomteacher(sub.id)">Delete</a>
                        </small>
                    </div>
                <div v-show="classroomsmgd == ''">
                <p>Not Managing any Class</p>
                </div>
            </div>  
            </center>
            <section v-if="step==1">
                <center>
                    
                    <div class="form-group-row">
                            <div class="form-group">
                                <label >Title</label>
                                <select v-model="newStaff.title" id=""  @input="checkInput">
                                    <option value="">Select Title</option>
                                    <option value="mr">Mr.</option>
                                    <option value="miss">Miss</option>
                                    <option value="mrs">Mrs.</option>
                                    <option value="dr">Dr.</option>
                                    <option value="engr">Engr.</option>
                                    <option value="prof">Prof</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date of Appointment</label>
                                <input  @input="checkInput" v-model="newStaff.appointment_date" type="month" placeholder="...">
                            </div> 
                    </div>                                                   
                <div class="form-group-row">
                    <div class="form-group">
                        <label >Firstname</label>
                        <input  @input="checkInput" v-model="newStaff.firstname" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >Lastname</label>
                        <input  @input="checkInput" v-model="newStaff.lastname" type="text" placeholder="...">
                    </div>                
                    <div class="form-group">
                        <label >Othername(s)</label>
                        <input  @input="checkInput" v-model="newStaff.othernames" type="text" placeholder="...">
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                            <label >Staff Type</label>
                                <select v-model="newStaff.staff_type"  @change="checkInput">
                                <option value="">Choose Staff Type</option>
                                    <option value="teaching">Teaching Staff</option>
                                    <option value="non-teaching"> Non Teaching Staff</option>
                                </select>
                        </div>
                        <div class="form-group">
                            <label >Rank</label>
                                <select v-model="newStaff.rankid"  @change="checkInput">
                                    <option value="">Select Rank</option>
                                    <option v-for="rank in ranks" :value="rank.id" :key="rank.id">{{rank.rank}}</option>
                                </select>
                        </div>
                        <div class="form-group">
                            <label >Date of Birth</label>
                            <input  @input="checkInput" v-model="newStaff.dob" type="date" placeholder="...">
                        </div>
                    </div>
                    <div class="form-group-row">                       
                        <div class="form-group">
                            <label >Gender</label>
                            <select  v-model="newStaff.genderid" @change="checkInput">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label >Religion</label>
                            <select disabled v-model="newStaff.religion" @change="checkInput">
                                <option value="christian">Christian</option>
                                <option value="islam">Islam</option>
                            </select>
                        </div>
                    </div>
                </center>
            </section>        
            <section v-if="step==2">
                <center>
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Nationality <span style="color:red">*</span></label>
                        <select v-model="newStaff.nationalityid" @change="getStateofO(newStaff.nationalityid)">
                        <option value="">Select Country</option>
                            <option v-for="country in countries"  :value="country.id" :key="country.id"> {{ country.country}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>State of Origin <span style="color:red">*</span></label>
                        <select v-model="newStaff.stateoforiginid" @change="checkInput" >
                            <option value="">Select State of Origin</option>
                            <option v-for="statee in stateofo" :value="statee.id" :key="statee.id" >{{statee.state}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label>L.G.A</label>
                        <input  @input="checkInput" v-model="newStaff.local_govt_area" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea  @input="checkInput" v-model="newStaff.address" cols="30" form-group-rows="2" placeholder="..."></textarea>
                    </div>
                </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label>Country </label>
                        <select v-model="newStaff.countryid" @change="getState(newStaff.countryid)" >
                            <option value="">Select Country</option>
                            <option  v-for="country in countries" :value="country.id" :key="country.id"> {{ country.country   }}</option>
                        </select>
                </div>
                <div class="form-group">
                    <label>State</label>
                    <select v-model="newStaff.stateid" @change="getCity(newStaff.stateid)">
                        <option value="">Select State</option>
                        <option v-for="statee in states" :value="statee.id" :key="statee.id">{{statee.state}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>City</label>
                    <select v-model="newStaff.cityid" @change="checkInput">
                        <option value="">Select City</option>
                        <option v-for="city in cities" :value="city.id" :key="city.id" >{{ city.city }}</option>
                    </select>
                </div>
            </div>
        </center>
            </section>

            <section v-if="step==3">
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Contact Email Address</label>
                        <input @input="checkInput" v-model="newStaff.contactemail" type="email" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label>Contact Telephone</label>
                        <input @input="checkInput" v-model="newStaff.contacttel" type="text" placeholder="...">
                    </div>

                </div>
            </section>
            <section v-if="step==4">
                <div class="form-group-row">
                    <div class="form-group">
                        <label class="form-label">staff Image <small style="color:red">maximum file upload size(2mb)</small></label>
                            <input class="form-control" @change="pickFile" type="file" placeholder="...">
                        </div>
                </div>
            </section>
            <center style="margin-bottom:20px">
                <button @click.prevent="prevStep" v-if="this.step > 1">Previous</button>
                <button @click.prevent="nextStep" v-if="this.step != this.totalsteps">Next</button>
                <button @click.prevent="addStaff" v-if="this.step == this.totalsteps && this.updateMode == false">Add New staff</button>
                <button @click.prevent="updateStaff" v-if="this.step == this.totalsteps && this.updateMode == true">Update staff</button>
            </center>
        </section>
         <section v-if="employmentHistory">
            <employment :key="historyKey" :staffuserid="staffuserid" />
        </section>
         <section v-if="assignSubject">
            <assign-subject 
                :subjectgroups="subjectgroups"
                :allsubjectgroups="allsubjectgroups"
                @addSubject="addSubject"
                @deleteallsubjectgroups="deleteallsubjectgroups"
                @saveSubjectAssign="saveSubjectAssign"
            />
        </section>
        <section v-if="assignClassroom">
            <assign-class-room 
                @addClassRoomGroup="addClassRoomGroup"
                @deleteallclassroomgroups="deleteallclassroomgroups"
                @saveClassRoomTeacherAssign="saveClassRoomTeacherAssign"
                :classroomgroups="classroomgroups"
                :allclassroomgroups="allclassroomgroups"
            />
        </section>      
         <section v-if="updatePassword">
            <center>
                <div class="form-group">
                    <input type="text" v-model="newPassword.password">
                </div>
                <button @click="updateUserPassword()">Update Password</button>
            </center>
        </section> 
        <section v-if="!employmentHistory">
            <h1 class="card-title">All Staff</h1>
                <center>
                    <p>Listed Below are all the registered staff in this school</p>
                </center>
                    <table id="all-staff">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Staff Type</th>
                                <th>Rank</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody :key="reloadKey">
                            <tr v-for="staff in allstaff" :key="staff.id">
                            <td style=""><center>{{staff.title}}</center></td>
                            <td style=""><center>{{staff.firstname}}</center></td>
                            <td style=""><center>{{staff.lastname}}</center></td>
                            <td style=""><center>{{staff.staff_type}}</center></td>
                            <td style="width:50px;"><center>{{staff.rank.rank}}</center></td>
                            <td style="">
                                <button  id="delete" style="width:50px; margin-right:2%" @click.prevent="deleteStaff(staff.id)" data-toggle="tooltip" data-placement="top" title="Disable staff Profile">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button style="width:50px; margin-right:2%" id="edit" @click.prevent="getSingleStaff(staff.id)" data-toggle="tooltip" data-placement="top" title="Modify staff" >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button style="width:50px; background:orange; margin-right:2%;" v-if="staff.staff_type=='teaching'" @click.prevent="assSubject(staff.id)" data-toggle="tooltip" data-placement="top" title="Add Students to staff profile" >
                                    <i class="fas fa-book-open "></i>
                                </button>
                                <button style="width:50px; background:green; margin-right:2%" @click.prevent="assignClassRoomGroup(staff.id)" data-toggle="tooltip" data-placement="top" title="Manage Classroom">
                                    <i class="fas fa-chalkboard-teacher"></i>
                                </button>
                                <button style="width:50px; background:black" @click.prevent="Employment(staff.id)" data-toggle="tooltip" data-placement="top" title="Add Employment History">
                                    <i class="fas fa-file-archive" aria-hidden="true"></i>
                                </button>
                                <button style="width:50px; background:purple" @click.prevent="getUser(staff.staffuseraccountid)" data-toggle="tooltip" data-placement="top" title="update Password">
                                    <i class="fas fa-key" aria-hidden="true"></i>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
        </section>
       
       
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import User from '../../apis/User.js'
import Staff from '../../apis/Staff'
import AssignSubject from './AssignSubject.vue'
import AssignClassRoom from './AssignClassRoom.vue'
import Employment from './EmploymentHistory.vue'

export default {    
    components:{AssignSubject, AssignClassRoom, Employment},
    data() {
        return {
                checkFilled:false,
                createProfile:false,
                employmentHistory:false,                
                assignSubject:false,                
                assignClassroom:false,
                updatePassword:false,
                newPassword:{
                    'user':"",
                    'password':""
                },
                newStaff:{
                    title:"",
                    firstname:"",
                    lastname:"",
                    othernames:"",
                    dob:"",
                    genderid:"",
                    religion:"",
                    appointment_date:"",
                    nationalityid:"",
                    stateoforiginid:"",
                    local_govt_area:"",
                    address:"",
                    countryid:"",
                    stateid:"",
                    cityid:"",
                    contactemail:"",
                    contacttel:"",
                    photo:"",
                    branchid:"",
                    rankid:"",
                    staff_type:""

                },
                updateMode:false,
                countries:null,
                states:null,
                stateofo:null,
                cities:null,
                user:null,
                step:1,
                employmentForm:{
                    staffid:"",
                    employer:"",                    
                    startdate:"",
                    enddate:"",
                },
                totalsteps:4,
                classgroups:null,
                image:null,
                allstaff:null,
                profileid:null,
                ranks:null,
                staffuserid:null,
                subjectgroups:null,
                allsubjectgroups:[],
                subjectstaught:null,
                classroomgroups:null,
                allclassroomgroups:[],
                classroomsmgd:null,
                tableKey:0,
                historyKey:0,
                selectedfile:null,
                reloadKey:0
            }
    },

    methods: {
        getUser(id){
            this.updatePassword = true
            this.createProfile = false
            this.assignSubject = false
            this.employmentHistory = false
            this.updateMode = false
            this.newPassword.user = id
        },
        updateUserPassword(){
            Staff.updatePassword(this.newPassword.user, this.newPassword).then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Password Updated'
                })
            }).catch((err) => {
                 Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Password Updated'
                })
            });
        },
        staffProfile(){
            this.createProfile = !this.createProfile
            this.assignSubject = false
            this.employmentHistory = false
            this.updateMode = false
            this.updatePassword = false,
            this.newStaff.title = ""
            this.newStaff.appointment_date = ""
            this.newStaff.firstname = ""
            this.newStaff.lastname = ""
            this.newStaff.othernames = ""
            this.newStaff.dob = ""
            this.newStaff.genderid = ""
            this.newStaff.religion = ""
            this.newStaff.nationalityid = ""
            this.newStaff.stateoforiginid = ""
            this.newStaff.local_govt_area = ""
            this.newStaff.address = ""
            this.newStaff.countryid = ""
            this.newStaff.stateid = ""
            this.newStaff.cityid = ""
            this.newStaff.rankid = ""
            this.newStaff.contactemail = ""
            this.newStaff.contacttel = ""
            this.newStaff.photo = ""
            this.profileid = ""
            this.staffuserid = ""
            this.newStaff.staff_type = ""
            this.step = 1
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
            // if(this.step == 1 && this.newStaff.title !="" && this.newStaff.firstname != "" && this.newStaff.lastname != "" && this.newStaff.genderid != "" && this.newStaff.rankid != "" && this.newStaff.staff_type != "")
            // {
            //     this.checkFilled = false
            // }else if(this.step == 2 && this.newStaff.local_govt_area != ""  && this.newStaff.nationalityid != "" && this.newStaff.stateoforiginid){
            //     this.checkFilled = false
            // }else if(this.step == 3 && this.newStaff.contactemail != "" && this.newStaff.contacttel != ""){
            //     this.checkFilled = false
            // }else if(this.step == this.totalsteps){
            //     this.checkFilled = false
            // }else{
            //     this.checkFilled = true
            // }
        },
        prevStep(){
            this.checkInput()
            this.step--
        },
        getCountry(){
            Staff.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            Staff.getState(countryid).then((result) => {
                this.states = result.data
            })
        },
        getStateofO(countryid){
            Staff.getStateofO(countryid).then((result) => {
                this.stateofo = result.data
            })
        },
        getCity(stateid){
             Staff.getCity(+stateid).then((result) => {
                this.cities = result.data
            })
        },
        getRank(){
            Staff.getRank(this.user.branchid).then((result) => {
                this.ranks = result.data
            })
        },
        getClassGroups(){
            Staff.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
            })
        },
        pickFile(e){        
            if(e.target.files[0]['size'] < 2111775){
                this.selectedfile = e.target.files[0]     
                const config = {
                    headers:{'content-type':'multipart/form-data'}
                }
                var formData = new FormData()
                formData.append('file',this.selectedfile)
                Staff.uploadImage(formData, config).then((result) => {
                    this.newStaff.photo = result.data            
                }).catch((err) => {});
            }else{
                Swal.fire({
                            icon: 'warning',
                            title: 'Oooops',
                            text: 'You are uploading a file larger than 2mb'
                })
            }
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.newStaff.branchid = this.user.branchid
                this.getStaff()
                this.getRank()
                this.getCountry()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#all-staff').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        subjectGroupDatatable(){            
            $(function() {
                 $('#all-subjectgroups').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        }, 
        classGroupDatatable(){            
            $(function() {
                 $('#all-classrooms').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },        
        getStaff(){
            Staff.getStaff(this.user.branchid).then((result) => {
                this.allstaff = result.data
                this.datatable()
                this.tableKey++
                if(this.updateMode == true){
                    this.getSingleStaff(this.profileid)
                }
            });            
        },
        addStaff(){            
            Staff.addStaff(this.newStaff).then(() => {                  
                    this.staffProfile()
                    this.getStaff()
                    this.reloadKey++
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'staff Profile Created',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
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
        getSingleStaff(id){
            this.createProfile = !this.createProfile
            this.assignSubject = false
            this.employmentHistory = false  
            this.assignClassroom = false
            this.updatePassword = false            
                      
            Staff.getSingleStaff(id).then((result) => {
                    this.newStaff.title = result.data[0]['title']
                    this.newStaff.appointment_date = result.data[0]['appointment_date']
                    this.newStaff.firstname = result.data[0]['firstname']
                    this.newStaff.lastname = result.data[0]['lastname']
                    this.newStaff.othernames = result.data[0]['othernames']
                    this.newStaff.dob = result.data[0]['dob']
                    this.newStaff.genderid = result.data[0]['genderid']
                    this.newStaff.religion = result.data[0]['religion']
                    this.newStaff.nationalityid = result.data[0]['nationalityid']
                    this.newStaff.stateoforiginid = result.data[0]['stateoforiginid']
                    this.newStaff.local_govt_area = result.data[0]['local_govt_area']
                    this.newStaff.address = result.data[0]['address']
                    this.newStaff.countryid = result.data[0]['countryid']
                    this.newStaff.stateid = result.data[0]['stateid']
                    this.newStaff.cityid = result.data[0]['cityid']
                    this.newStaff.rankid = result.data[0]['rankid']
                    this.newStaff.contactemail = result.data[0]['contactemail']
                    this.newStaff.contacttel = result.data[0]['contacttel']
                    this.newStaff.photo = result.data[0]['photo']
                    this.profileid = result.data[0]['id']
                    this.staffuserid = result.data[0]['staffuseraccountid']
                    this.newStaff.staff_type = result.data[0]['staff_type']
                    if(result.data != ''){
                        this.checkFilled = false
                        this.updateMode = true
                        this.updateFetch()
                    }
                    this.getSubjectTeacher()
                    this.getClassRoomTeacher()

            })
        },
        updateStaff(){
            // //this.checkTelInput()
            Staff.updateStaff(this.profileid, this.newStaff).then(() => {
                 this.getStaff()
                 this.staffProfile()
                 this.reloadKey++
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'staff Profile Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })            

            }).catch(() => {
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
        deleteStaff(id){
            Staff.deleteStaff(+id).then(() => {
                this.getStaff()
                this.reloadKey++
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'staff Profile Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch(() => {
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
      checkTelInput(){
            var tel = this.newStaff.contacttel
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

        getSubjectGroup(){
            Staff.getSubjectGroup(this.user.branchid).then((result) => {
                this.subjectgroups = result.data
                this.subjectGroupDatatable()                                
            });
        },
        updateFetch(){
            this.getState(this.newStaff.countryid)
            this.getCity(this.newStaff.stateid)
            this.getStateofO(this.newStaff.nationalityid)
            this.getClassGroups()
        },
        
        assSubject(id){
            Staff.assSubject(id).then((result) => {
                this.staffuserid = result.data[0]['staffuseraccountid']
                this.getSubjectGroup()
            })
            this.assignSubject = !this.assignSubject
            this.assignClassroom = false
            this.employmentHistory = false
            this.createProfile = false            
        },
        addSubject(id,title,classname){
             var index = this.allsubjectgroups.findIndex(x => x.staffuseraccountid==this.staffuserid &&  x.subjectid==id)
            if(index === -1){
                this.allsubjectgroups.push(
                    {
                        'subjectid':id,
                        'staffuseraccountid':this.staffuserid,
                        'subject':title,
                        'class':classname
                    })

            }else{
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'This Subject has been added!!!',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        },

        saveSubjectAssign(){
            Staff.saveSubjectAssign(this.allsubjectgroups).then(() => {
                this.assignSubject  = false
                  this.getStaff()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'staff Profile Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
              this.allsubjectgroups = null           

            }).catch(() => {
                  this.getStaff()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'staff Profile not Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        getSubjectTeacher(){
            Staff.getSubjectTeacher(this.staffuserid).then((result) => {
                this.subjectstaught = result.data
            })
        },

        deleteTutorSubject(id){
            Staff.deleteTutorSubject(id).then(() => {
                this.getSubjectTeacher()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Removed',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },
        deleteallsubjectgroups(id){
            var getIndex = this.allsubjectgroups.indexOf(id)
            this.allsubjectgroups.splice(getIndex, 1)
        },
        getClassroomGroups(){
            Staff.getClassroomGroups(this.user.branchid).then((result) => {
                this.classroomgroups = result.data        
                this.classGroupDatatable()
            })
        },
        assignClassRoomGroup(id){
            Staff.assignClassRoomGroup(id).then((result) => {
                this.staffuserid = result.data[0]['staffuseraccountid']
            })
            this.getClassroomGroups()
            this.assignClassroom = !this.assignClassroom
            this.employmentHistory = false
            this.createProfile = false
            this.assignSubject = false

        },
        addClassRoomGroup(id,classname,group){
             var index = this.allclassroomgroups.findIndex(x => x.teacherid==this.staffuserid &&  x.classroomgroupid==id)
            //  console.log(index)
            if(index === -1){
                this.allclassroomgroups.push(
                    {
                        'classroomgroupid':id,
                        'teacherid':this.staffuserid,
                        'classgroup':group,
                        'classroom':classname
                    })

            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Student has already been added as Ward to Parent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        },
        saveClassRoomTeacherAssign(){
            Staff.saveClassRoomTeacherAssign(this.allclassroomgroups).then(() => {
                this.assignClassroom = false
                this.getStaff()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Classroom Management Assigned',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.allclassroomgroups = null
            }).catch(() => {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Classroom Management not Assigned',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        deleteallclassroomgroups(id){
            var getIndex = this.allclassroomgroups.indexOf(id)
            this.allclassroomgroups.splice(getIndex, 1)
        },
        getClassRoomTeacher(){
            Staff.getClassRoomTeacher(this.staffuserid).then((result) => {
                this.classroomsmgd = result.data
            })
        },
        deleteclassroomteacher(id){
                    Staff.deleteclassroomteacher(id).then(() => {
                        this.getClassRoomTeacher()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Removed',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
        },
        Employment(id){
            Staff.getSingleStaff(id).then((result) => {
                this.staffuserid = result.data[0]['staffuseraccountid']
            })
            this.employmentHistory = !this.employmentHistory
            this.createProfile = false
            this.assignSubject = false
            this.assignClassroom = false
            localStorage.setItem('staffuserid', id)
            this.historyKey++
        },
       
    },

    created() {
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


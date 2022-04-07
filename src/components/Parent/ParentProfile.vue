<template>
    <div>
        <h1>Parents & Wards</h1>
        <center style="margin-bottom:20px">
            <button style="width:20%; margin-right:5%; margin-bottom:5%" @click="parentProfile">Create Profile</button>                                                
        </center>  
        <section v-if="createProfile && !assWard">
         <div class="col-lg-4" v-if="updateMode==true">
                <div>
                    <center>
                        <h5 class="ml-5">parent Details</h5>
                    </center>
                </div>                            
            </div>
            <center style="margin-bottom:20px">
                <div class="img-container" style="margin-bottom:10px">
                        <img :src="'http://localhost:8000/images/parents/'+this.newParent.photo" alt="parent photo">                    
                </div>
                <h5 v-if="updateMode">Wards</h5>
                <div v-for="ward in wards" :key=ward.id>
                    <div v-for="student in ward" :key=student.id>
                        <a href="#" @click.prevent="getSingleStudent(student.id)">
                            {{student.firstname}} {{student.lastname}}
                        </a>
                        <small style="margin-left:5%; background:red; cursor:pointer">
                             <a ref="#" style="color:white" @click="deleteward(student.studentuseraccountid)">Delete</a>
                        </small>
                    </div>
                </div>
                <hr>
            </center>
        <div v-if="step==1" >
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Title</label>
                        <select v-model="newParent.title" id="" @input="checkInput">
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
                        <label>Occupation</label>
                        <input @input="checkInput" v-model="newParent.occupation" type="text" placeholder="...">
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                    <label>Firstname</label>
                    <input @input="checkInput" v-model="newParent.firstname" type="text" placeholder="...">
                </div>
                <div class="form-group">
                    <label>Lastname</label>
                    <input @input="checkInput" v-model="newParent.lastname" type="text" placeholder="...">
                </div>
                <div class="form-group">
                    <label>Othername(s)</label>
                    <input @input="checkInput" v-model="newParent.othernames" type="text" placeholder="...">
                </div>
            </div>
            <div class="form-group-row">                
                <div class="form-group">
                    <label>Date of Birth</label>
                    <input @input="checkInput" v-model="newParent.dob" type="date" placeholder="...">
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select v-model="newParent.genderid" @change="checkInput">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Religion</label>
                    <select v-model="newParent.religion" @change="checkInput">
                        <option value="">Select Religion</option>
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
                    <select v-model="newParent.nationalityid" @change="getStateofO(newParent.nationalityid)">
                        <option v-for="country in countries"  :value="country.id" :key="country.id"> {{ country.country }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>State of Origin <span class="text-danger">*</span></label>
                    <select v-model="newParent.stateoforiginid" @change="checkInput">
                        <option v-for="statee in stateofo" :value="statee.id" :key="statee.id" >{{statee.state}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label>L.G.A</label>
                    <input @input="checkInput" v-model="newParent.local_govt_area" type="text" placeholder="...">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <textarea @input="checkInput" v-model="newParent.address" cols="50" rows="2" placeholder="..."></textarea>
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label>Country </label>
                    <select  v-model="newParent.countryid" @change="getState(newParent.countryid)">
                        <option  v-for="country in countries" :value="country.id" :key="country.id"> {{ country.country   }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>State</label>
                    <select  v-model="newParent.stateid" @change="getCity(newParent.stateid)">
                        <option value="">Select</option>
                        <option v-for="statee in states" :value="statee.id" :key="statee.id">{{statee.state}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>City</label>
                    <select v-model="newParent.cityid" @change="checkInput">
                        <option value="">Select</option>
                        <option v-for="city in cities" :value="city.id" :key="city.id" >{{ city.city }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="step==3" >
        <div class="form-group-row">
            <div class="form-group">
                <label>Contact Email Address</label>
                <input @input="checkInput" v-model="newParent.contactemail" type="email" placeholder="...">
            </div>
            <div class="form-group">
                <label>Contact Telephone</label>
                <input v-model="newParent.contacttel" type="text" placeholder="...">
            </div>
            <div class="form-group">
                <label>parent Image</label>
                <input @change="pickFile" type="file" placeholder="...">
            </div>                                                    
        </div>
        </div>
      
        <center>
            <button @click.prevent="prevStep" v-if="this.step > 1">Previous</button>
            <button @click.prevent="nextStep" v-if="this.step != this.totalsteps ">Next</button>
            <button @click.prevent="addParent" v-if="this.step == this.totalsteps && this.updateMode == false" >Add New parent</button>
            <button @click.prevent="checkTelInput" v-if="this.step == this.totalsteps  && this.updateMode == true">Update Parent</button>

        </center>
        </section>
        <section v-if="updatePassword">
            <center>
                <div class="form-group">
                    <input type="text" v-model="newPassword.password">
                </div>
                <button @click="updateUserPassword()">Update Password</button>
            </center>
        </section> 
        <section v-if="assWard">
            <table id="all-students">
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
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{student.firstname}}</td>
                        <td>{{student.lastname}}</td>
                        <td>{{student.class_group.classgroupname}}</td>
                        <td>{{student.enrollmentdate}}</td>
                        <td>{{student.genderid}}</td>
                        <td>
                            <button style="background:green" @click.prevent="addWard(student.studentuseraccountid, student.firstname, student.lastname, student.class_group.classgroupname,student.genderid)" data-toggle="tooltip" data-placement="top" title="This is my child">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
             <table class="table table-bordered dt-responsive nowrap w-100">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Class Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ward in newWard" :key="ward.id">
                        <td>{{ward.firstname}}</td>
                        <td>{{ward.lastname}}</td>
                        <td>{{ward.classgroupname}}</td>
                        <td>
                            <button id="delete" @click.prevent="removeFromWard(ward)">
                                <i class="fas fa-trash" aria-hidden="true"></i>
                            </button>                            
                        </td>
                    </tr>                    
                </tbody>                
            </table>
            <center style="margin-top:10%">
                <button style="background:green" @click.prevent="saveWard">
                    Save
                </button>
            </center>
        </section>
        <section style="margin-top:50px">
            <h1>All Parents</h1>
            <center>
                <p>Listed Below are all the registered parents in this school</p>
            </center>
            <table id="all-parents">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody :key="tableKey">
                    <tr v-for="parent in parents" :key="parent.id">
                        <td><center>{{parent.title}}</center></td>
                        <td><center>{{parent.firstname}}</center></td>
                        <td><center>{{parent.lastname}}</center></td>
                        <td><center>{{parent.genderid}}</center></td>
                        <td >
                        <center>
                            <button style="width:50px"     id="delete" @click.prevent="deleteParent(parent.id)" data-toggle="tooltip" data-placement="top" title="Disable Parent Profile">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button style="width:50px" id="edit" @click.prevent="getSingleParent(parent.id)" data-toggle="tooltip" data-placement="top" title="Modify Parent" >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button style="width:50px;background:orange; margin-top:2%; margin-left:5%" @click.prevent="assignWards(parent.id)" data-toggle="tooltip" data-placement="top" title="Add Students to Parent profile" >
                                <i class="fas fa-users"></i>
                            </button>
                            <button style="width:50px; background:purple" @click.prevent="getUser(parent.id)" data-toggle="tooltip" data-placement="top" title="update Password">
                                    <i class="fas fa-key" aria-hidden="true"></i>
                                </button>
                        </center>
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
import Parent from '../../apis/Parent.js'
export default {
    data() {
        return {
                checkFilled:false,
                createProfile:true,
                assWard:false,
                updatePassword:false,
                newPassword:{
                    'user':"",
                    'password':""
                },
                newParent:{
                    title:"",
                    firstname:"",
                    lastname:"",
                    othernames:"",
                    dob:"",
                    genderid:"",
                    religion:"",
                    occupation:"",
                    classgroups:"",
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
                    branchid:""

                },
                 newStudent:{
                    firstname:"",
                    lastname:"",
                    othernames:"",
                    dob:"",
                    genderid:"",
                    religion:"",
                    nationalityid:"",
                    stateoforiginid:"",
                    local_govt_area:"",
                    address:"",
                    countryid:"",
                    stateid:"",
                    cityid:"",
                    enrollmentdate:"",
                    contactemail:"",
                    contacttel:"",
                    yearid:"",
                    photo:"",
                    branchid:""
                },
                newWard: [],
                wards:[],
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
                parents:null,
                profileid:null,
                students:null,
                parentuserid:null,
                tableKey:0,
                selectedfile:null
            }
    },

    methods: {
        getUser(id){
            this.updatePassword = true
            this.createProfile = false
            this.updateMode = false
            this.assWard = false 
            this.newPassword.user = id
        },
        updateUserPassword(){
            Parent.updatePassword(this.newPassword.user, this.newPassword).then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Password Updated'
                })
            }).catch((err) => {
                
            });
        },
        parentProfile(){
            this.createProfile = !this.createProfile            
            this.updateMode = false
            this.assWard = false  
            this.update
            this.step = 1  
            this.newStudent.firstname = ""
                    this.newStudent.lastname = ""
                    this.newStudent.othernames = ""
                    this.newStudent.dob = ""
                    this.newStudent.genderid = ""
                    this.newStudent.religion = ""
                    this.newStudent.nationalityid = ""
                    this.newStudent.stateoforiginid = ""
                    this.newStudent.local_govt_area = ""
                    this.newStudent.address = ""
                    this.newStudent.countryid = ""
                    this.newStudent.stateid = ""
                    this.newStudent.cityid = ""
                    this.newStudent.enrollmentdate = ""
                    this.newStudent.contactemail = ""
                    this.newStudent.contacttel = ""
                    this.newStudent.yearid = ""
                    this.newStudent.photo = ""
                    this.profileid = ""
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
            // if(this.step == 1 && this.newParent.title && this.newParent.firstname != null && this.newParent.lastname != null && this.newParent.dob != null && this.newParent.genderid != null && this.newParent.religion != null)
            // {
            //     this.checkFilled = false
            // }else if(this.step == 2 && this.newParent.countryid != null && this.newParent.stateid != null && this.newParent.cityid != null && this.newParent.local_govt_area != null && this.newParent.address != null && this.newParent.nationalityid != null && this.newParent.stateoforiginid){
            //     this.checkFilled = false
            // }else if(this.step == 3 && this.newParent.contactemail != null && this.newParent.contacttel != null){
            //     this.checkFilled = false
            // }else if(this.step == this.totalsteps){
            //     this.checkFilled = false
            // }else{
            //     this.checkFilled = true
            // }
        },
        prevStep(){
            // this.checkInput()
            this.step--
        },
        getCountry(){
            Parent.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            Parent.getState(countryid).then((result) => {
                this.states = result.data
            })
        },
        getStateofO(countryid){
            Parent.getStateofO(countryid).then((result) => {
                this.stateofo = result.data
            })
        },
        checkTelInput(){
          var tel = this.newParent.contacttel
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
        getCity(stateid){
            Parent.getCity(stateid).then((result) => {
                this.cities = result.data
            })
        },
        getStudents(){
            Parent.getStudents(this.user.branchid).then((result) => {
                this.students = result.data
                this.datatableStudents()
            })
        },
        datatableStudents(){
            $(function() {
                $('#all-students').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getClassGroups(){
            Parent.getClassGroups(this.user.branchid).then((result) => {
                this.classgroups = result.data
            })
        },
        getSingleStudent(id){
            Parent.getSingleStudent(id).then((result) => {
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
                    this.newStudent.photo = result.data[0]['photo']
                    this.profileid = result.data[0]['id']                  
                    this.createProfile = !this.createProfile
                    this.assWard = false


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
                Parent.uploadImage(formData, config).then((result) => {
                    this.newParent.photo = result.data            
                }).catch(() => {});
            }else{
            Swal.fire({
                icon: 'warning',
                title: 'Oooops',
                text: 'You are uploading a file larger than 2mb'
            })
            }
        },
        getParents(){
            Parent.getParents(this.user.branchid).then((result) => {
                this.parents = result.data
                this.datatable()
                if(this.updateMode == true){
                this.getSingleParent(this.profileid)
            }
            })
        },
        addParent(){
            this.checkTelInput()
            Parent.addParent(this.newParent).then((result) => {
                  this.getParents()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'parent Profile Created',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.tableKey++
            }).catch((err) => {
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
        getSingleParent(id){           
            Parent.getSingleParent(id).then((result) => {
                this.newParent.title = result.data[0]['title']
                this.newParent.occupation = result.data[0]['occupation']
                this.newParent.firstname = result.data[0]['firstname']
                this.newParent.lastname = result.data[0]['lastname']
                this.newParent.othernames = result.data[0]['othernames']
                this.newParent.dob = result.data[0]['dob']
                this.newParent.genderid = result.data[0]['genderid']
                this.newParent.religion = result.data[0]['religion']
                this.newParent.nationalityid = result.data[0]['nationalityid']
                this.newParent.stateoforiginid = result.data[0]['stateoforiginid']
                 this.newParent.local_govt_area = result.data[0]['local_govt_area']
                this.newParent.address = result.data[0]['address']
                this.newParent.countryid = result.data[0]['countryid']
                this.newParent.stateid = result.data[0]['stateid']
                this.newParent.cityid = result.data[0]['cityid']
                this.newParent.contactemail = result.data[0]['contactemail']
                this.newParent.contacttel = result.data[0]['contacttel']
                this.newParent.photo = result.data[0]['photo']
                this.profileid = result.data[0]['id']
                this.parentuserid = result.data[0]['useraccountid']
                        if(result.data != ''){
                            this.checkFilled = false
                            this.updateMode = true                            
                            this.updateFetch()
                        }
                        this.getWards()
                        this.createProfile = true
                        this.assWard = false
                })
        },
        updateParent(){
            this.checkTelInput()
            Parent.updateParent(this.profileid, this.newParent).then((result) => {
                 this.getParents()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Parent Profile Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.tableKey++

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
        deleteParent(id){
            Parent.deleteParent(id).then((result) => {
                this.getParents()
                this.tableKey++
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'parent Profile Deleted',
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
        assignWards(id){
           Parent.assignWards(id).then((result) => {
                this.parentuserid = result.data[0]['useraccountid']
                this.getWards()
                this.assWard = !this.assWard
                this.createProfile = false
            })            

        },
        addWard(studentuseraccountid, firstname, lastname, classgroupname,genderid){
            if(this.newWard != null){
                var index = this.newWard.findIndex(x => x.studentid==studentuseraccountid &&  x.parentid==this.parentuserid)
                if(index === -1){
                    this.newWard.push(
                        {
                            'parentid':this.parentuserid,
                            'studentid':studentuseraccountid,
                            'firstname':firstname,
                            'lastname':lastname,
                            'classgroupname':classgroupname,
                            'genderid':genderid
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

            }else{
                //
            }
        },
        removeFromWard(id){
            var getIndex = this.newWard.indexOf(id)
            this.newWard.splice(getIndex, 1)
        },

        saveWard(){
            Parent.saveWard(this.newWard).then((result) => {
                 this.getWards()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Student added as Ward to Parent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.newWard = []                    
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Student has already been added as Ward to Parent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        updateFetch(){
            this.getState(this.newParent.countryid)
            this.getCity(this.newParent.stateid)
            this.getStateofO(this.newParent.nationalityid)
            this.getClassGroups()
        },
        getWards(){
            Parent.getWards(this.parentuserid).then((result) => {
                this.wards = result.data
            })
        },
        deleteward(id){
            Parent.deleteward(id).then(() => {
                this.getWards()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.newParent.branchid = this.user.branchid
                this.getParents()
                this.getStudents()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#all-parents').DataTable({                    
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



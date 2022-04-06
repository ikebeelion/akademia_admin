<template>
    <div>
        <h1>School Profile</h1>
        <center>
            <button style="width:20%; margin-right:5%" @click="showSchoolData">Display School Data</button>
            <button style="width:20%; margin-bottom:5%" @click="showPrincipalData">Principal Officer Data</button>
            <div class="img-container" v-if="this.schoolProfile.schoollogo != null">
                <img :src="'https://github.com/ikebeelion/akademia_api/blob/main/public/images/school/'+this.schoolProfile.schoollogo" alt="school photo">
            </div>
            <p>{{this.schoolProfile.schoolmotto}}</p>
        </center>
        <hr style="margin-bottom:20px;">
        <section v-if="schooldata">
            <center>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >School Name</label>
                        <input  @input="checkInput" v-model="schoolProfile.schoolname" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >School Alias</label>
                        <input  @input="checkInput" v-model="schoolProfile.alias" type="text" placeholder="...">
                    </div>                                            
                </div>
                <div class="form-group">
                    <label >Address</label>
                    <textarea  @input="checkInput" v-model="schoolProfile.address" cols="6" rows="2" placeholder="..."></textarea>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >Date of Establishment</label>
                        <input  @input="checkInput" v-model="schoolProfile.year_of_establishment" type="date" placeholder="...">
                    </div>            
                    <div class="form-group">
                        <label >Country </label>
                        <select v-model="schoolProfile.countryid" @change="getState(schoolProfile.countryid)">
                            <option value="">Select Country</option>
                            <option  v-for="country in countries" :value="country.id" :key="country.id"> {{ country.country   }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >State</label>
                        <select v-model="schoolProfile.stateid" @change="getCity(schoolProfile.stateid)">
                            <option value="">Select State</option>
                            <option v-for="statee in states" :value="statee.id" :key="statee.id">{{statee.state}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >City</label>
                        <select v-model="schoolProfile.cityid" @change="checkInput">
                            <option value="">Select City</option>
                            <option v-for="city in cities" :value="city.id" :key="city.id" >{{ city.city }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">                                                        
                        <label >School Email Address</label>
                        <input  @input="checkInput" v-model="schoolProfile.schoolemail" type="email" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >School Telephone</label>
                        <input @input="checkInput" v-model="schoolProfile.schooltel" type="text" placeholder="...">
                    </div>                                                    
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >School Moto</label>
                        <input  @input="checkInput" v-model="schoolProfile.schoolmotto" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >School Logo</label>
                        <input  @change="pickFile" type="file" placeholder="...">
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >School Zone</label>
                        <input  @input="checkInput" v-model="schoolProfile.schoolzone" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >School Chapter</label>
                        <input  @input="checkInput" v-model="schoolProfile.schoolchapter" type="text" placeholder="...">
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >School Association of Affiliation</label>
                        <input  @input="checkInput" v-model="schoolProfile.associationAffiliation" type="text" placeholder="...">
                    </div>
                    <div class="form-group">
                        <label >Student Educaton District</label>
                        <input  @input="checkInput" v-model="schoolProfile.educationDistrict" type="text" placeholder="...">
                    </div>
                </div>                
                <button style="margin-bottom:20px" @click.prevent="updateSchoolProfile" >Update School Profile</button>                               
            </center>
        </section>
        <section v-if="principaldata">
            <table style="width:100%; position:relative">
                <tbody >
                    <tr>
                        <th>Title</th>
                        <td>{{principalOfficer[0].title}}</td>
                    </tr>
                    <tr>
                        <th>Appointment Date</th>
                        <td>{{principalOfficer[0].appointment_date}}</td>
                    </tr>
                    <tr>
                        <th>Firstname</th>
                        <td>{{principalOfficer[0].firstname}}</td>
                    </tr>
                    <tr>
                        <th>Lastname</th>
                        <td>{{principalOfficer[0].lastname }}</td>
                    </tr>
                    <tr>
                        <th>Email Adress</th>
                        <td>{{principalOfficer[0].contactemail }}</td>
                    </tr>
                    <tr>
                        <th>Telephone</th>
                        <td>{{principalOfficer[0].contacttel}}</td>
                    </tr>
                </tbody>
            </table>
        </section>
       
    </div>
</template>
<script>
import User from '../../apis/User.js'
import School from '../../apis/School.js'
import Swal from 'sweetalert2'
  export default {                        
    data() {
        return {
            schooldata:true,
            principaldata:false,
            checkFilled:true,
            schoolProfile:{
                schoolname:"",
                alias:"",
                schoolemail:"",
                schooltel:"",
                schoollogo:"",
                schoolmotto:"",
                address:"",
                countryid:"",
                stateid:"",
                cityid:"",
                year_of_establishment:"",
                schoolzone:"",
                schoolchapter:"",
                associationAffiliation:"",
                educationDistrict:"",
                // principal:""
            },
            countries:null,
            states:null,
            cities:null,
            user:null,
            image:null,
            principalOfficer:null,
            error:null,
            selectedfile:null
        }
    },
    
    methods: {
        showSchoolData(){
            this.principaldata = false
            this.schooldata = true
        },
        showPrincipalData(){
            this.principaldata = true
            this.schooldata = false
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getCountry()    
                
                this.getSchoolInfo()                                
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        checkInput(){
            if(this.schoolProfile.schoolname != "" && this.schoolProfile.schoolemail != "" && this.schoolProfile.schooltel != "" && this.schoolProfile.year_of_establishment != "" && this.schoolProfile.address != "" && this.schoolProfile.countryid != "" && this.schoolProfile.stateid != "" && this.schoolProfile.cityid != "")
            {
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        getCountry(){
            School.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            if(this.schoolProfile.countryid != ""){
                School.getState(countryid).then((result) => {
                    this.states = result.data
                })
            }
        },
        checkTelInput(){
            var tel = this.schoolProfile.schooltel
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
     getprincipalOfficer(){
            School.getPrincipalOfficer(this.user.branchid).then((result) => {
                this.principalOfficer = result.data
            })
        },

    getCity(stateid){
        if(this.schoolProfile.stateid != ""){
            School.getCity(stateid).then((result) => {
                this.cities = result.data
            })
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
            School.uploadImage(formData, config).then((result) => {
                this.schoolProfile.schoollogo = result.data            
            }).catch((err) => {});
         }else{
                Swal.fire({
                            icon: 'warning',
                            title: 'Oooops',
                            text: 'You are uploading a file larger than 2mb'
                            })
            }
      
    },
        updateFetch(){
            this.getState(this.schoolProfile.countryid)
            this.getCity(this.schoolProfile.stateid)
        },
        getSchoolInfo(){
            School.getSchoolInfo(this.user.branch.schoolid).then((result) => {
                this.schoolProfile.schoolname = result.data['schoolname']
                this.schoolProfile.alias = result.data['alias']
                this.schoolProfile.schoolemail = result.data['schoolemail']
                this.schoolProfile.schooltel = result.data['schooltel']
                this.schoolProfile.schoollogo = result.data['schoollogo']
                this.schoolProfile.schoolmotto = result.data['schoolmotto']
                this.schoolProfile.address = result.data['address']
                this.schoolProfile.countryid = result.data['countryid']
                this.schoolProfile.stateid = result.data['stateid']
                this.schoolProfile.cityid = result.data['cityid']
                this.schoolProfile.year_of_establishment = result.data['year_of_establishment']
                this.schoolProfile.schoolzone = result.data['schoolzone']
                this.schoolProfile.schoolchapter = result.data['schoolchapter']
                this.schoolProfile.associationAffiliation = result.data['associationAffiliation']
                this.schoolProfile.educationDistrict = result.data['educationDistrict']
                this.getprincipalOfficer()
                                    
            })
        },
        updateSchoolProfile(){
            console.log(this.schoolProfile)
            if(this.error == null){
                School.updateSchoolProfile(this.user.branch.schoolid, this.schoolProfile).then(() => {
                    this.getSchoolInfo()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Schoool Profile Updated',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }).catch(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Schoool Profile not Updated',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                });
            }
            else{
                Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Check Telephone Number',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }                        
        }
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
        border-radius: 50%;
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

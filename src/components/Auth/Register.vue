<template>
    <div>
    <!-- <form> -->
		<p style="color:red">{{errors}}</p>
            <div v-if="this.step==1">
                <div class="mb-3">
                    <label for="schoolname">School Name <span class="text-danger">*</span></label>
                    <div class="invalid-feedback" v-if="errors != null && schooldata.schoolname == null">
                        Please Enter School Name
                    </div>
                    <input type="text" class="input-box" v-model="schooldata.schoolname" placeholder="Enter Name" @input="checkAnswered">
                    
                </div>
                <div class="mb-3">
                    <label for="schoolname">School Alias <span class="text-danger">*</span></label>
                    <div class="invalid-feedback" v-if="errors != null && schooldata.alias == null">
                        Please Enter School Alias
                    </div>
                    <input type="text" class="input-box" v-model="schooldata.alias" placeholder="Enter Alias" @input="checkAnswered">
                </div>

                <div class="mb-3" id="datepicker2">
                    <label for="schoolname">Establishment Year <span class="text-danger">*</span></label>
                    <input type="date" class="input-box" placeholder="dd M, yyyy"
                        v-model="schooldata.year_of_establishment"  @input="checkAnswered"
                    >
                </div>
    
        </div>
        <div v-if="this.step==2">
        <div class="mb-3">
            <label for="userpassword">Address <span class="text-danger">*</span></label>
            <input type="text" class="input-box" id="userpassword" placeholder="Address"
                v-model="schooldata.address"  @input="checkAnswered">
    </div>

    <div class="row">
    <div class="mb-3 col-12">
            <label>Country <span class="text-danger">*</span></label>

                <select
                class="input-box"
                v-model="schooldata.countryid"
                @change="getState(schooldata.countryid)"
                >
                <option value="null">Select Country</option>
                <option
                    v-for="country in countries"
                    :value="country.id"
                    :key="country.id"
                > {{ country.country   }}</option>
            </select>
    </div>
            <div class="mb-3 col-6">
            <label>State <span class="text-danger">*</span></label>
            <select
            class="input-box"
            v-model="schooldata.stateid"
            @change="getCity(schooldata.stateid)">
            <option value="null">Select State</option>
                    <option
                    v-for="statee in states"
                    :value="statee.id"
                    :key="statee.id"
                        >{{statee.state}}</option>
            </select>

        </div>
        <div class="mb-3 col-6">
            <label>City <span class="text-danger">*</span></label>
            <select
                class="input-box"
                v-model="schooldata.cityid"
                @change="checkAnswered">
                    <option value="null">Select State</option>
                     <option
                    v-for="city in cities" :key="city.id"
                    :value="city.id">{{ city.city }}</option>
            </select>
                </div>
            </div>

        </div>
        <!--  motto, email.... -->
                                                <div v-if="this.step==3">
                                                    <!-- <div class="mb-3">
                                                        <label for="useremail">School Logo</label>
                                                        <input type="file" class="input-box" id="useremail" v-model="schooldata.schoollogo" placeholder="School Photo"
                                                        >
                                                    </div> -->

                                                    <div class="mb-3">
                                                        <label for="username">Motto <span class="text-danger">*</span></label>
                                                        <input type="text" class="input-box" v-model="schooldata.schoolmotto" placeholder="Your Moto..."
                                                        @input="checkAnswered"
                                                        >
                                                    </div>

                                                    <div class="mb-3">
                                                        <label for="username">Email Address <span class="text-danger">*</span></label>
                                                        <input type="email" class="input-box" v-model="schooldata.schoolemail" placeholder="email address"
                                                        @input="checkAnswered">
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="username">Telephone <span class="text-danger">*</span></label>
                                                        <input type="text" class="input-box" v-model="schooldata.schooltel" placeholder="tel"
                                                        @input="checkAnswered">
                                                    </div>
                                                </div>
                                                <!-- branch and access -->
                                                <div v-if="this.step==4">
                                                    <div class="mb-3">
                                                        <label for="schoolzone">Branch Name <span class="text-danger">*</span></label>
                                                        <input type="text" class="input-box" v-model="branchData.branchname" id="useremail" placeholder="Enter Branch Name" required
                                                        @input="checkAnswered">
                                                        <div class="invalid-feedback" v-if="errors !=null && branchData.branchname == null">
                                                            Please Enter Address
                                                        </div>
                                                    </div>

                                                   <div class="form-group-row">
                                                        <div class="form-group">
                                                        <label for="schoolzone">Branch Address <span class="text-danger">*</span></label>
                                                        <input type="text" class="input-box" v-model="branchData.branchaddress" id="useremail" placeholder="Enter Branch Address" required
                                                        @input="checkAnswered"
                                                        >
                                                        </div>
                                                        <div class="form-group">                                                                                                                        
                                                            <button type="button" style="font-size:8px; border:1px solid white; background:black; color:white" @click="useCommonAddress">school address</button>                                                        
                                                        </div>
                                                        <div class="invalid-feedback"  v-if="errors !=null && branchData.branchaddress == null">
                                                            Please Enter Email
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                                <div v-if="this.step==5">
                                                    <div class="mb-3">
                                                        <label for="username">Username <span class="text-danger">*</span></label>
                                                        <input type="text" class="input-box" v-model="useraccessData.username" id="username" placeholder="Enter username" required
                                                        @input="checkAnswered">
                                                        <div class="invalid-feedback" v-if="errors !=null && useraccessData.username == null">
                                                            Please Enter Username
                                                        </div>
                                                    </div>

                                                    <div class="mb-2">
                                                        <label for="userpassword">Password <span class="text-danger">*</span></label>
                                                        <input type="password" class="input-box"  v-model="useraccessData.password" id="userpassword" placeholder="Enter password" required
                                                        @input="checkAnswered">
                                                        <div class="invalid-feedback" v-if="errors !=null && useraccessData.password == null">
                                                            Please Enter Password
                                                        </div>
                                                    </div>

                                                    <center>
                                                        <p style="font-size:11px">By registering you agree to the Akademia <a href="#" class="text-primary">Terms of Use</a></p>
                                                    </center>
                                                </div>
                                                <!-- buttons -->
                                                <center>                                            
                                                    <button style="width:100px; margin-right:5%; background:orange" class="btn" v-if="this.step != 1 " @click.prevent="prevStep"> <i class="fa fa-backward" aria-hidden="true"></i> Previous Step </button>
                                                    <button style="width:100px; margin-right:5%; color:black; background:cyan"  class="btn" v-if="this.step != this.totalsteps" @click.prevent="nextStep" :disabled="checkFilled"> <i class="fa fa-forward" aria-hidden="true"></i> Next Step </button>
                                                    <button style="width:100px; background:green" class="btn" v-if="this.step == this.totalsteps" type="submit" @click="submitData">  Register</button>
                                                </center>
                      
	<!-- </form>          -->
    </div>
</template>

<script>
import Register from '../../apis/Register'
export default {    
    data() {
        return {
            totalsteps:5,
            step:0,
            checkFilled:true,
            schooldata:{
                schoolname:null,
                alias:null,
                year_of_establishment:null,
                address:null,
                countryid:null,
                stateid:null,
                cityid:null,
                schoollogo:null,
                schoolmotto:null,
                schoolemail:null,
                schooltel:null,
                schoolzone:null,
                schoolchapter:null,
                associationAffiliation:null,
                educationDistrict:null,
            },
            useraccessData:{
                username:null,
                password:null
            },
            branchData:{
                branchname:'Head Branch',
                branchaddress:null,
            },
            submit:[],
            errors:null,
            countries:null,
            states:null,
            cities:null

        }
    },

    methods: {
        checkAnswered(){
            this.errors = null
            if(this.step == 1 && this.schooldata.schoolname != null && this.schooldata.year_of_establishment != null){
                this.checkFilled = false
            }else if( this.schooldata.address != null && this.schooldata.countryid != null && this.schooldata.stateid != null && this.schooldata.cityid != null){
                this.checkFilled = false
            }else if(this.step == 3 && this.schooldata.schoolmotto != null && this.schooldata.schoolemail != null && this.schooldata.schooltel != null){
                this.checkFilled = false
            }else if(this.step == 4 && this.useraccessData.username != null && this.useraccessData.password != null && this.branchData.branchname != null & this.branchData.branchaddress != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        getCountry(){
            Register.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            Register.getState(countryid).then((result) => {
                this.states = result.data
            }).catch((err) => {

            });
        },
        getCity(stateid){
             Register.getCity(stateid).then((result) => {
                this.cities = result.data
            }).catch((err) => {

            });
        },

        nextStep(){
            this.checkFilled = true
            this.step = this.step + 1

            if(this.step == 2){
                this.getCountry()
            }
        },
        prevStep(){
            this.step = this.step - 1
            if(this.step == 2){
                this.getCountry()
            }
        },
        submitData(){
            this.submit = [this.schooldata, this.useraccessData, this.branchData];
            Register.submitData(this.submit).then((result) => {
                window.location.href = '/'
            }).catch((err) => {
                this.errors = err.response.data.errors[0][0]
            });

        },

        useCommonAddress(){
            this.branchData.branchaddress = this.schooldata.address
        },
        // useCommonTel(){
        //     this.branchData.tel = this.schooldata.schooltel
        // }

    },


    created() {        
        this.nextStep()
    },


}
</script>


<style scoped>

    *{
	margin: 0;
	padding: 0;
}

.container{
	width: 100%;
	height: 100vh;
	font-family: sans-serif;
	background-image: url('../../../public/login.png');
	background-size:cover;	
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card{
	width: 500px;
	height: 500px;
	box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.26);	
	border-radius: 20px;
	perspective: 1000px;
}

.inner-box{
	position: relative;
	width: 100%;
	height: 100%;	
	transform-style: preserve-3d;
	transition: transform 1s;
}

.card-front, .card-back{
	position: absolute;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;
	background-image: linear-gradient(rgba(16, 16, 27, 0.8), rgba(16, 16, 27, 0.8)), url('../../../public/login.png');
	padding: 55px;
	box-sizing: border-box;
	backface-visibility: hidden;
}

.card-back{
	transform: rotateY(180deg);
}

.card h2{
	font-weight: normal;
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
}

.google{
    width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
    cursor: pointer;

}

.google:hover{
    border:1px solid red
}
.input-box{
	width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
}

::placeholder{
	color: #fff;
	font-size: 12px;
}

button{
	width: 100%;
	background: transparent;
	border: 1px solid #fff;
	margin: 35px 0 10px;
	height: 32px;
	font-size: 12px;
	border-radius: 20px;
	padding: 0 1px;
	box-sizing: border-box;
	outline: none;
	color: #fff;
	cursor: pointer;
}

.submit-btn{
	position:  relative;
}

.submit-btn::after{
	content: '\27a4';
	color: #333;
	line-height: 32px;
	font-size: 17px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	right: -1px;
	top: -1px;
}

span{
	font-size: 12px;
	margin-left: 10px;
}

.card .btn{
	border: none;
	margin-top: 70px;
    border: 1px solid white;
}
label{
text-align: center;
font-size: 12px;
}

select option{
    color: black;
}
.card a{
	display: block;
	text-align: center;
	color: #fff;
	font-size: 13px;
	margin-top: 8px;
}    
.icon{	
	position:  relative;
	display: flex;	
	justify-content: center;
	align-content: center;
	height: 60px;
	line-height: 60px;
	padding-top: 0;
	margin-top: -46px;
    margin-bottom: 10px;
}
.icon .logo{			
	
	width: 100px;
}
.invalid-feedback{
    font-size: 12px;
    color:red
}
 .form-group-row{
		display: flex;
        position: relative;
	}

    .form-group-row input, select{
        position:relative ;
        width: 300px;
        margin-right: 10px;
    }

</style>


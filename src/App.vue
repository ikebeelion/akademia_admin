<template>
   <div class="container">   
        <div class="navigation" v-if="this.$route.path != '/'">
            <ul>
				<li>
					<router-link @click="closeToggle" to="">
						<span class="icon">
                			<img class="logo" src="logo.png" alt="">
            			</span>
						<span class="title"><h2>Akademia</h2></span>
					</router-link>
				</li>		
        <li>		
					<router-link @click="closeToggle" to="/dashboard" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-tachometer-alt"></i>
            </span>
						<span class="title">Dashboard</span>
					</router-link>
				</li>
				 <li>		
			<router-link @click="closeToggle"  to="/school" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-school    "></i>
            	</span>
				<span class="title">School Profile</span>
			</router-link>
		</li>
			 <li>		
			<router-link @click="closeToggle"  to="/branch" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-code-branch    "></i>
            	</span>
				<span class="title">School Branch</span>
			</router-link>
		</li>
		<li>		
			<router-link @click="closeToggle"  to="/timeline" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-clock" aria-hidden="true"></i>
            	</span>
				<span class="title">Academic Timeline</span>
			</router-link>
		</li>
		<li>		
			<router-link @click="closeToggle"  to="/resulttype" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-file" aria-hidden="true"></i>
            	</span>
				<span class="title">Result Type</span>
			</router-link>
		</li>
		<li>		
			<router-link @click="closeToggle"  to="/timetable" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-table" aria-hidden="true"></i>
            	</span>
				<span class="title">Time Table</span>
			</router-link>
		</li>
        <li>		
		<router-link @click="closeToggle" to="/subjects" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
						<span class="title">Subjects</span>
					</router-link>
				</li>
        <li>		
					<router-link @click="closeToggle" to="/classgroups" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-object-group" aria-hidden="true"></i>
            </span>
						<span class="title">Class Groups</span>
					</router-link>
				</li>
        <li>		
					<router-link @click="closeToggle" to="/classroom" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-users"></i>
            </span>
						<span class="title">Class Room</span>
					</router-link>
				</li>
        <li>		
					<router-link @click="closeToggle" to="/staff" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-chalkboard-teacher"></i>
            </span>
						<span class="title">Staff Profile</span>
					</router-link>
				</li>
		
        <li>		
			<router-link @click="closeToggle" to="/student" active-class="activeLink">
				<span class="icon"> 
              		<i class="fas fa-user-graduate"></i>
            	</span>
				<span class="title">Student Profile</span>
			</router-link>
		</li>
        <li>		
			<router-link @click="closeToggle" to="/parent" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-male" aria-hidden="true"></i>
            </span>
						<span class="title">Parent Profile</span>
					</router-link>
				</li>
				<li>		
					<router-link @click="closeToggle" to="/position" active-class="activeLink">
						<span class="icon"> 
							<i class="fas fa-arrow-up" aria-hidden="true"></i>
						</span>
						<span class="title">Position</span>
					</router-link>
				</li>
				<li>		
					<router-link @click="closeToggle" to="/domain" active-class="activeLink">
						<span class="icon"> <i class="fas fa-list-alt" aria-hidden="true"></i> </span>
						<span class="title">Result Domains</span>
					</router-link>
				</li>
				<li>		
					<router-link @click="closeToggle" to="/promote" active-class="activeLink">
						<span class="icon"> 
							<i class="fas fa-arrow-circle-right" aria-hidden="true"></i>
						</span>
						<span class="title">Promote Students</span>
					</router-link>
				</li>
				<!-- <li>		
					<router-link @click="closeToggle" to="/pastoral" active-class="activeLink">
						<span class="icon"><i class="fas fa-house"></i> </span>
						<span class="title">Pastoral</span>
					</router-link>
				</li>
				<li>		
					<router-link @click="closeToggle" to="/calendar" active-class="activeLink">
						<span class="icon"><i class="fas fa-calendar"></i> </span>
						<span class="title">Calendar</span>
					</router-link>
				</li> -->
				<li>		
					<router-link @click="closeToggle" to="/sms" active-class="activeLink">
						<span class="icon"><i class="fas fa-sms" aria-hidden="true"></i></span>
						<span class="title">Send Messages</span>
					</router-link>
				</li>
			</ul>
        </div>
        <div class="main" v-if="this.$route.path != '/'">
        <div class="topbar">
            <div class="toggle" @click.prevent="toggleMenu"></div>				                
			<div class="schoolinfo">
				<h1>
					{{this.schoolProfile.schoolname}}
					
				</h1>
				<small>
						<p>{{this.schoolProfile.address}}</p>	
					</small>
			</div>
			
			
		<div>
			<button @click.prevent="logout" style="background:red; border:none; border-radius:20px; width:70px"> 
					<i class="fa fa-sign-out" aria-hidden="true"></i>
			</button>
			</div>
         </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>     
		<div v-else>
			<router-view></router-view>
		</div>                              
    </div>
</template>

<script>
import User from '../src/apis/User'
import School from '../src/apis/School'
export default {
  name: 'App',
  data() {
	  return {
		  user:null,
		schoolProfile:{
			schoolname:"",
			schoolemail:"",
			schooltel:"",
			schoollogo:"",
			schoolmotto:"",
			address:"",
		},
		schoolname:"",
		address:""
	  }
  },
  methods: {
	getAuth(){
            User.auth().then((result)=>{				
                this.user = result.data                                                                				                
				this.getSchoolInfo()
			}).catch(()=>{
				this.$router.push('/')
			})
        },
	getSchoolInfo(){
		School.getSchoolInfo(this.user.branch.schoolid).then((result) => {
                this.schoolProfile.schoolname = result.data['schoolname']                
                this.schoolProfile.schoolemail = result.data['schoolemail']
                this.schoolProfile.schooltel = result.data['schooltel']
                this.schoolProfile.schoollogo = result.data['schoollogo']
                this.schoolProfile.schoolmotto = result.data['schoolmotto']
                this.schoolProfile.address = result.data['address']                
				this.schoolname = result.data['schoolname']
				this.address =  result.data['address']
                                    
            })
	},
    toggleMenu(){    
      		let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		},
	closeToggle(){
		let toggle = document.querySelector('.toggle');            
		let navigation = document.querySelector('.navigation')
		let main = document.querySelector('.main')            
		navigation.classList.remove('active')
		toggle.classList.remove('active')
		main.classList.remove('active')	
	},	 
		logout(){
			User.logout().then(() => {
				localStorage.removeItem("auth")				
				localStorage.clear()
				this.$router.push('/')
			})
		}
  },

  created() {
	this.getAuth()	
  },
  
}
</script>

<style>
@import url('../src/assets/css/style.css');
#delete{
	background:red;
	margin-right:5%;
}

#edit{
	background: navy;
}

</style>

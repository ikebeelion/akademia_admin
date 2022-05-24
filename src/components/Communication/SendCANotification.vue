<template>
    <div>
    <h1>Send CA Notification to Guardians</h1>
    <section>
    <center>
        <div>
            <div class="form-group mb-2">
                <label> Academic Period (session) </label>
                    <select name="" id="" v-model="message.period" @change="getGroup">
                        <option value="null"> -- </option>
                        <option 
                            v-for="period in periods" :key="period"
                            :value="period.id">
                            {{ period.term }} {{ period.session.session }}
                            </option>
                    </select>
            </div>

             <div class="form-group mb-2">
                <label> Class Group </label>
                    <select v-model="message.group">
                        <option  :value="null"> Select Group </option>
                        <option  v-for="group in classgroups" :value="group.id" :key="group.id"> {{ group.classgroupname}} </option>
                    </select>
            </div>
            
            <button @click="sendSMS">Send</button>
        </div>
    </center>
    </section>  

         </div>

</template>

<script>
import User from '../../apis/User.js'
import Sms from '../../apis/Sms.js'
import Swal from 'sweetalert2'
import Timeline from '../../apis/Timeline.js'
export default {    
    data() {
        return {
                checkFilled:true,
                message:{
                    period:"null",                    
                    group:"null",                    
                },
                updateMode:false,                
                user:null,
                classgroups:null,
                wardgroups:null,
                periods:null


            }
    },

    methods: {
        checkInput(){
            if(this.newRank.rank != ""){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        getPeriod(){
            Timeline.getPeriod(this.user.branchid).then((result) => {
                this.periods = result.data  
            })
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getPeriod()
                this.getGroup()
            }).catch(()=>{
				this.$router.push('/')
			})
        },          
        sendSMS(){
            Sms.sendCAsMS(this.user.branchid, this.message).then((result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Message Sent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })                
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Message not sent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        getGroup(){
            // get group student group
            Sms.getGroup(this.user.branchid).then((result) => {
                    this.classgroups = result.data
                })
        },        
    },

    created() {        
      this.getAuth()

    },

}
</script>

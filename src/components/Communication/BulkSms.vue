<template>
    <div>
    <h1>Send Messages</h1>
    <section>
    <center>
        <div>
            <div class="form-group mb-2">
                <label> Category </label>
                    <select name="" id="" v-model="message.category" @change="getGroup">
                        <option value=""> -- </option>
                        <option value="1"> Parents </option>
                        <option value="2"> Students </option>
                        <option value="3"> Staff </option>
                    </select>
            </div>
            <div class="form-group mb-2" v-show="this.classgroups != null" >
                <label> Class Group </label>
                    <select v-model="message.group">
                        <option  :value="0"> All Students </option>
                        <option  v-for="group in classgroups" :value="group.id" :key="group.id"> {{ group.classgroupname}} </option>
                    </select>
            </div>
            <div class="form-group" v-show="this.wardgroups != null" >
                    <label> Ward Group </label>
                    <select  v-model="message.wardgroup">
                        <option  :value="0"> All </option>
                        <option  v-for="group in wardgroups" :value="group.id" :key="group.id"> {{ group.classgroupname}} </option>
                    </select>
                </div>
        </div>
    </center>
    </section>
    <section>
        <center>
            <h1>Message</h1>
            <textarea v-model="message.content" id="" cols="30" rows="10"></textarea>
            <button @click.prevent="sendSms">Send SMS</button>
        </center>
    </section>

         </div>

</template>

<script>
import User from '../../apis/User.js'
import Sms from '../../apis/Sms.js'
import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:true,
                message:{
                    category:"",
                    content:"",
                    group:"",
                    wardgroup:""
                },
                updateMode:false,                
                user:null,
                classgroups:null,
                wardgroups:null


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
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
            }).catch(()=>{
				this.$router.push('/')
			})
        },       

        getGroup(){
            // get group student group
            if(this.message.category == 2){
                Sms.getGroup(this.user.branchid).then((result) => {
                    this.classgroups = result.data
                    this.wardgroups = null
                }).catch((err) => {
                });
            }else if(this.message.category == 1){
                Sms.getGroup(this.user.branchid).then((result) => {
                    this.wardgroups = result.data
                    this.classgroups = null
                }).catch((err) => {
                });                
            }else{
                this.classgroups = null
            }
        },

        sendSms(){
            Sms.sendSms(this.user.branchid, this.message).then((result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Messages Sent',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Messages not Sent',
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

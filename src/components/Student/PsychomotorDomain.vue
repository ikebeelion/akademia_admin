<template>
    <div>
        <section style="margin-bottom:50px">
            <center>
                <button style="background:brown" @click="viewPscyhomotor">Psychomotor Domain</button>
                <button style="background:brown" @click="viewAffective">Affective Domain</button>
            </center>
        </section>
        <section v-if="affectiveDomain">
            <affective-domain />
        </section>
        <section v-if="psychomotorDomain">
            <h1>Psychomotor</h1>  
            <section>
            
                <center>
                <div class="form-group">
                    <label>Psychomotor</label>
                    <input type="text" placeholder="..." v-model="psychomotor.psych" @input="checkInput">
                </div>
                    <button @click.prevent=addPsychomotor v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
                    <button @click.prevent=updatePsych() v-if="updateMode">Update</button>
                </center>

            </section>  
            <section style="margin-top:50px">
                <h1>All Psychomotor</h1>
                    <center>
                        <p>Listed Below are all the registered Psychomotor in this school</p>
                    </center>

                                            <table id="all-Psychomotors">
                                                <thead>
                                                <tr>
                                                    <th>Class Room</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="psych in psychomotors" :key="psych.id">
                                                    <td><center>{{psych.psychomotor}}</center></td>
                                                    <td>
                                                        <center>
                                                            <button id="delete" @click="deletePsych(psych.id)">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                            <button id="edit" @click="getSinglePsych(psych.id)">
                                                                <i class="fas fa-edit"></i>
                                                            </button>
                                                        </center>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
            </section>  
        </section>
    </div>

</template>

<script>
import User from '../../apis/User.js'
import Psychomotor from '../../apis/Psychomotor.js'
import Swal from 'sweetalert2'
import affectiveDomain from './AffectiveDomain.vue'
export default {
    components:{affectiveDomain},
    data() {
        return {
                checkFilled:true,
                psychomotor:{
                    psych:"",
                },
                psychid:null,
                updateMode:false,
                psychomotors:[],
                user:null,
                psychomotorDomain:true,
                affectiveDomain:false
            }
    },

    methods: {
        checkInput(){
            if(this.psychomotor.psych != ""){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
    viewPscyhomotor(){
        this.psychomotorDomain = !this.psychomotorDomain
        this.affectiveDomain = !this.affectiveDomain
    },
    viewAffective(){
        this.psychomotorDomain = !this.psychomotorDomain
        this.affectiveDomain = !this.affectiveDomain
    },
    getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getPsychomotors()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#all-Psychomotors').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getPsychomotors(){
            Psychomotor.getPsychomotors(this.user.branchid).then((result) => {
                this.psychomotors = result.data            
                this.datatable()
            })
        },
        getSinglePsych(id){
            this.updateMode = true
            Psychomotor.getSinglePsych(id).then((result) => {
                this.psychomotor.psych =  result.data.psychomotor
                this.psychid = result.data.id
            })
        },

        addPsychomotor(){
            var post = [this.psychomotor, this.user.branchid]
            Psychomotor.addPsychomotor(post).then((result) => {
                this.getPsychomotors()
                this.psychomotor.psych = ""
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Psychomotor Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },

        updatePsych(){
            Psychomotor.updatePsych(this.psychid , this.psychomotor).then((result) => {
                this.getPsychomotors()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Psychomotor Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
                this.psychomotor.psych = ""
            }).catch((err) => {
                Swal.fire({
                position: 'top-end',
                    icon: 'error',
                    title: 'Psychomotor not Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        deletePsych(id){
             Psychomotor.deletePsych(id).then((result) => {
                this.getPsychomotors()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Psychomotor Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        }
    },

    created() {        
        this.getAuth()

    },

}
</script>

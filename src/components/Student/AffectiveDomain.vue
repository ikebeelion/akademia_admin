<template>
    <div>
        <h1>Affective Domain</h1>
        <section>
            <center>
                <div class="form-group">
                    <label>Affective Domain</label>
                    <input type="text" placeholder="..." v-model="affective_domain.affective_domain" @input="checkInput">
                </div>
                <button @click.prevent=addDomain v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
                <button @click.prevent=updateDomain() v-if="updateMode">Update</button>
            </center>
        </section>
        <section style="margin-top:50px">
         <table id="all-affective_domains">
            <thead>
                <tr>
                    <th>Class Room</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="domain in affective_domains" :key="domain.id">
                    <td><center>{{domain.affective_domain}}</center></td>
                    <td><center>
                            <button id="delete" @click="deleteDomain(domain.id)">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button id="edit" @click="getSingleDomain(domain.id)">
                                <i class="fas fa-edit"></i>
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
import User from '../../apis/User.js'
import Domains from '../../apis/Affective.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                checkFilled:true,
                affective_domain:{
                    affective_domain:"",
                },
                psychid:null,
                updateMode:false,
                affective_domains:[],
                user:null,

            }
    },

    methods: {
        checkInput(){
            if(this.affective_domain.affective_domain != ""){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getDomains()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#all-affective_domains').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getDomains(){
            Domains.getDomains(this.user.branchid).then((result) => {
                this.affective_domains = result.data
                this.datatable()            
            })
        },
        getSingleDomain(id){
            this.updateMode = true
            Domains.getSingleDomain(id).then((result) => {
                this.affective_domain.affective_domain =  result.data.affective_domain
                this.psychid = result.data.id
            })
        },

        addDomain(){
            var post = [this.affective_domain, this.user.branchid]
            Domains.addDomain(post).then((result) => {
                this.getDomains()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Affective Domain Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.affective_domain.affective_domain = ""
            })
        },

        updateDomain(){
            Domains.updateDomain(this.psychid , this.affective_domain).then((result) => {
                this.getDomains()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Affective Domain Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
                this.affective_domain.affective_domain = ""
            })
        },

        deleteDomain(id){
             Domains.deleteDomain(id).then((result) => {
                this.getDomains()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Domain Deleted',
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

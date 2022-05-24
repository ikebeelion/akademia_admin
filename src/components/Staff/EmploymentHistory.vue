<template>
    <div>          

        <center>
        <h5 style="margin-bottom:10px">Employment History</h5>
        <form>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="">Employer</label>
                    <input @input="checkinput" required type="text" placeholder=".." v-model="employmentForm.employer">
                </div>
            </div>  
            <div class="form-group-row">
                <div class="form-group">
                    <label for="">Start Date</label>
                    <input @input="checkinput" required type="date" placeholder=".." v-model="employmentForm.startdate">
                </div>
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label for="">End Date</label>
                    <input @input="checkinput" required type="date" placeholder=".." v-model="employmentForm.enddate">
                </div>
            </div>       
                        
            <button type="button" v-if="!updateMode" :disabled="checkFilled" @click="addemployment">
                Save
            </button>
            <button type="button" v-if="updateMode" :disabled="checkFilled" @click="updateemployment">
                Update
            </button>
        </form>
        </center>
        
        <div style="margin-top:20px; margin-bottom:20px" v-if="this.emphistory != null">
        <center>
            <table>
                <thead>
                    <tr>
                        <th>Employer</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody :key="tableKey">
                    <tr v-for="hist in emphistory" :key="hist.id">
                    <td><center>{{hist.employer}}</center></td>
                    <td><center>{{hist.startdate}}</center></td>
                    <td><center>{{hist.enddate}}</center></td>
                    <td>
                        <button id="delete" @click.prevent="deleteemployment(hist.id)">
                            <i class="fas fa-trash" aria-hidden="true"></i>
                        </button>
                        <button id="edit" @click.prevent="getsingleemployment(hist.id)">
                            <i class="fas fa-edit" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
            </table>        
        </center>
        </div>
    
    </div>

</template>
<script>
import Staff from '../../apis/Staff'
import Swal from 'sweetalert2'
export default {
    props:{
        staffuserid:null
    },
    data() {
        return {
            updateMode:false,
            selectedid:"",            
            checkFilled:true,
            employmentForm:{
                employer:null,                    
                startdate:null,
                enddate:null,
            }, 
            emphistory:null,
            tableKey:0

                      
        }        
    },

    methods: {
        checkinput(){
            if(this.employmentForm.employer != null && this.employmentForm.startdate != null && this.employmentForm.enddate !=null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        gethistory(){
            console.log(this.$props.staffuserid)
            Staff.gethistory(this.$props.staffuserid).then((result) => {
                this.emphistory = result.data          
                this.tableKey++
            })
        },
         addemployment(){  
             var post = [this.$props.staffuserid, this.employmentForm]
            Staff.addemployment( post ).then(() => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'staff Profile Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })     
                this.gethistory()           
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.response.data.errors[0][0],
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                }) 
            });
        },
        getsingleemployment(id){
            this.updateMode = !this.updateMode
            Staff.getsingleemployment(id).then((result) => {
                this.employmentForm.employer = result.data['employer']                
                this.employmentForm.startdate = result.data['startdate']
                this.employmentForm.enddate = result.data['enddate']
                this.selectedid = result.data['id']
            })
        },
        updateemployment(){            
            Staff.updateemployment(  this.selectedid, this.employmentForm ).then(() => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Employment Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })     
                this.gethistory()           
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.response.data.errors[0][0],
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                }) 
            });
        },
        deleteemployment(id){
            Staff.deleteemployment(id).then(() => {                
                Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'Employment Updated',
                   customClass: 'Swal-wide',
                   showConfirmButton: false,
                   timer: 3000
               }) 
               this.gethistory()                       
            })
        },
    },
    watch:{
        staffuserid(){            
            this.gethistory()
        }
    },    
    
}
</script>
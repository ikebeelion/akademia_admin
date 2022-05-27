<template>
    <div>
        <h1>Branches</h1>
         <center class="loading" v-if="isLoading">
            <loading />
        </center>
        <section style="margin-bottom:20px">
            <center>
                <div class="form-group-row">
                    <div class="form-group">
                        <label >Branch Name</label>
                        <input  @input="checkInput" type="text" placeholder="..." v-model="newBranch.branchname">
                    </div>
                    <div class="form-group">
                        <label >Branch Address</label>
                        <input  @input="checkInput" type="text" placeholder="..." v-model="newBranch.branchaddress">
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Country <span style="color:red">*</span></label>
                        <select v-model="newBranch.countryid" @change="getState(newBranch.countryid)">
                            <option value="">Select Country</option>
                            <option v-for="country in countries" :value="country.id" :key="country.id"> 
                                {{ country.country   }}
                            </option> 
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">State <span style="color:red">*</span></label>
                        <select v-model="newBranch.stateid" @change="getCity(newBranch.stateid)">
                            <option value="">Select State</option>
                            <option v-for="statee in states" :value="statee.id" :key="statee.id" >
                                {{statee.state}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">City <span style="color:red">*</span></label>
                        <select v-model="newBranch.cityid" @change="checkInput">
                            <option value="">Select City</option>
                            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.city }}</option>
                        </select>
                    </div>
                </div>        
                <div class="form-group">
                    <label>Branch Contact Tel</label>
                    <input type="text" placeholder="..." v-model="newBranch.branchtel" @input="checkInput">
                </div>
                <button @click.prevent=addBranch v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
                <button @click.prevent=updateBranch() v-if="updateMode">Update</button>
            </center>
        </section>      
        <section>
        <h1 class="card-title">All Branches</h1>
        <center>
            <p>Listed Below are all the registered branches in this school</p>
        </center>
        <table id="all-branches">
            <thead>
                <tr>
                    <th>Branch Name</th>
                    <th>Branch Address</th>                                                
                    <th>Contact Tel.</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="branch in allbranches" :key="branch.id">
                    <td>{{branch.branchname}}</td>
                    <td>{{branch.branchaddress}}</td>                                                
                    <td>{{branch.branchtel}}</td>
                    <td>
                        <button id="delete" @click="deleteBranch(branch.id)" :disabled="user.branchid == branch.id">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button id="edit" @click="getSingleBranch(branch.id)">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                    </tr>
                </tbody>
            </table>
    </section>  
    </div>
</template>

<script>
import User from '../../apis/User.js'
import Branch from '../../apis/Branch.js'
import Swal from 'sweetalert2'
import Loading from '../Loading.vue'
export default {
    components:{Loading},
    data() {
        return {
                checkFilled:true,
                newBranch:{
                    branchname:"",
                    branchaddress:"",
                    countryid:"",
                    stateid:"",
                    cityid:"",
                    branchtel:""
                },
                isLoading:false,
                updateMode:false,
                countries:null,
                states:null,
                cities:null,
                branchid:null,
                schoolid:null,
                allbranches:[],
                user:null
            }
    },

    methods: {
        checkInput(){
            if(this.newBranch.branchname != "" && this.newBranch.branchaddress != "" && this.newBranch.countryid != "" && this.newBranch.stateid != "" && this.newBranch.cityid != "" && this.newBranch.branchtel != ""){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                                  
                this.schoolid = this.user.branch.schoolid
                this.getBranches()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        getCountry(){
            Branch.getCountry().then((result) => {
                this.countries = result.data
            })
        },
        getState(countryid){
            Branch.getState(countryid).then((result) => {
                this.states = result.data
            })
        },
        getCity(stateid){
             Branch.getCity(stateid).then((result) => {
                this.cities = result.data
            })
        },
        datatable(){
             $(function() {
                 $('#all-branches').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],                    
                });
            });
        },

        getBranches(){
            Branch.getBranches(this.schoolid).then((result) => {
                    this.allbranches = result.data
                    this.datatable()               
                })
        },
        addBranch(){
            this.isLoading = true
            var post = [this.newBranch, this.schoolid]
            Branch.addBranch(post).then(() => {
                this.getBranches()
                this.isLoading = false
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Branch Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },
        getSingleBranch(id){            
            Branch.getSingleBranch(id).then((result) => {
                    this.updateMode = true
                    this.newBranch.branchname = result.data.branchname
                    this.newBranch.branchaddress = result.data.branchaddress
                    this.newBranch.countryid = result.data.countryid
                    this.newBranch.stateid = result.data.stateid
                    this.newBranch.cityid = result.data.cityid
                    this.newBranch.branchtel = result.data.branchtel
                    this.branchid = result.data.id
                    this.getState(this.newBranch.countryid)
                    this.getCity(this.newBranch.stateid)
            })
        },

        updateBranch(){
            this.isLoading = true
            Branch.updateBranch(this.branchid , this.newBranch).then(() => {
                this.getBranches()
                this.isLoading = false
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Branch Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
            })
        },

        deleteBranch(id){
            this.isLoading = true
             Branch.deleteBranch(id).then(() => {
                this.getBranches()
                this.isLoading = false
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Branch Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        }
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
        border-radius: 50%;
        border: 1px solid #333;
    }   
    .img-container img{
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    @media (max-width:992px) {
    .form-group-row{
		display: block;
        position: relative;        
	}
            
    }
</style>


<template>
    <div>
        <h1>Result Types</h1>
        <section>
            <center>
                <div class="form-group">
                    <label>Type</label>
                    <input type="text" placeholder="..." v-model="newType.type" @input="checkInput">
                    <label>Percentage</label>
                    <input type="number" step="any" placeholder="..." v-model="newType.percentage" @input="checkInput">
                </div>

                <button @click.prevent=addType v-if="!updateMode" :disabled="this.checkFilled == true">Add</button> 
                <button @click.prevent=updateType() v-if="updateMode">Update</button>
            </center>
        </section>
        <section style="margin-top:50px">
        <h1>All Types</h1>
            <center>
            <p>Listed Below are all the registered Types in this school</p>
            </center>
            <table id="all-types">
                <thead>
                <tr>
                    <th>Result Type</th>
                    <th>Percentage</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody :key="tableKey">
                <tr v-for="type in types" :key="type.id">
                    <td><center>{{type.resulttype}}</center></td>
                    <td><center>{{type.percentage}}</center></td>
                    <td>
                        <button id="delete" @click="deleteType(type.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button id="edit" @click="getSingleType(type.id)">
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
import User from '../../apis/User'
import ResultType from '../../apis/Resulttype'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                checkFilled:true,
                newType:{
                    type:"",
                    percentage:""
                },
                updateMode:false,
                types:[],
                user:null,
                rankid:null,
                tableKey:0

            }
    },

    methods: {
        checkInput(){
            if(this.newType.type != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

        getType(){
            ResultType.getType(this.user.branchid).then((result) => {
                this.types = result.data
                this.datatable()
            })
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                                  
                this.getType()                
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        datatable(){            
            $(function() {
                 $('#all-types').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getSingleType(id){
            this.updateMode = true
            ResultType.getSingleType(id).then((result) => {
                this.newType.type =  result.data.resulttype
                this.newType.percentage = result.data.percentage
                this.rankid = result.data.id
            })
        },

        addType(){
            var post = [this.newType, this.user.branchid]
            ResultType.addType(post).then((result) => {
                this.getType()
                this.tableKey++
                this.newType.type = ""
                this.newType.percentage = ""
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Result type Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Result type not Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        updateType(){
            ResultType.updateType(this.rankid , this.newType).then((result) => {
                this.getType() 
                this.tableKey++               
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Result type Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
                this.newType.type = ""
                this.newType.percentage = ""
            })
        },

        deleteType(id){
             ResultType.deleteType(id).then((result) => {
                this.getType()
                this.tableKey++
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Result type Deleted',
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

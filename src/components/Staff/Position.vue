<template>
    <div>        
        <h1>Ranks</h1>
        <section>
        <center>
            <div class="form-group">
                <label>Rank</label>
                    <input type="text" placeholder="..." v-model="newRank.rank" @input="checkInput">
            </div>
            <button @click.prevent=addRank v-if="!updateMode" :disabled="this.checkFilled == true">Add</button>
            <button @click.prevent=updateRank() v-if="updateMode">Update</button>                                        
        </center>
        </section>
        <section style="margin-top:50px">
        <h1>All Ranks</h1>
           <center><p>Listed Below are all the registered ranks in this school</p></center>
             <table id="all-ranks">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rank in ranks" :key="rank.id">
                        <td><center>{{rank.rank}}</center></td>
                        <td>
                            <center>
                                <button id="delete" @click="deleteRank(rank.id)">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button id="edit" @click="getSingleRank(rank.id)">
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
import Rank from '../../apis/Rank.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                checkFilled:true,
                newRank:{
                    rank:"",
                },
                updateMode:false,
                ranks:[],
                user:null,
                rankid:null

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

        getRanks(){
            Rank.getRanks(this.user.branchid).then((result) => {
                this.ranks = result.data
                this.datatable()
            })
        },
        getSingleRank(id){
            this.updateMode = true
            Rank.getSingleRank(id).then((result) => {
                this.newRank.rank =  result.data.rank
                this.rankid = result.data.id
            })            
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                                  
                this.getRanks()            
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        datatable(){            
            $(function() {
                 $('#all-ranks').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        addRank(){
            var post = [this.newRank, this.user.branchid]
            Rank.addRank(post).then(() => {
                this.getRanks()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rank Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.newRank.rank = ""
            }).catch(() => {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Rank not Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        updateRank(){
            Rank.updateRank(this.rankid , this.newRank).then(() => {
                this.getRanks()
                Swal.fire({
                position: 'top-end',
                    icon: 'success',
                    title: 'Rank Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.updateMode = false
                this.newRank.rank = ""
            }).catch(() => {
                Swal.fire({
                position: 'top-end',
                    icon: 'error',
                    title: 'Rank did not update',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        deleteRank(id){
            Rank.deleteRank(id).then(() => {
                this.getRanks()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Rank Deleted',
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

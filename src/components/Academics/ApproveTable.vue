<template>
    <div>
    <h1>Timetable Approval Requests</h1>    
    <section>
          <table id="all-request">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Class Group</th>
                                            <th>Day</th>
                                            <th>Academic Period</th>
                                            <th>Status</th>
                                            <th>Start</th>
                                            <th>End</th>
                                            <th>Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody :key="tableKey">
                                        <tr v-for="data in table" :key="data.id">
                                            <td><center>{{ data.subjecttitle }}</center></td>
                                            <td v-if="data.timetabletype == 'class_timetable'"><center>{{ data.classgroupname}} - {{ data.classroom}}</center></td>
                                            <td v-else><center>{{ data.classgroupname }} </center></td>
                                            <td><center>{{ data.day }}</center></td>
                                            <td><center>{{ data.session}} {{ data.term }}</center></td>
                                            <td v-if="data.t_status == 'not_approved'">
                                                <center>
                                                    <i style="text-warning" class=" fa fa-times"></i>
                                                </center>
                                            </td>
                                            <td><center>{{ data.from }}</center></td>
                                            <td><center>{{ data.to }}</center></td>
                                            <td>
                                                 <button style="width:50px; background:green" @click="approve(data.tid)" v-if="data.t_status == 'not_approved'">
                                                    <i class="fas fa-check" aria-hidden="true"></i>
                                                </button>
                                                <button  style="width:50px; background:orange" @click="disapprove(data.tid)">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                                <button style="width:50px; background:red" @click="deleteTimetable(data.tid)">
                                                    <i class="fas fa-trash" aria-hidden="true"></i>
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
import ApproveTable from '../../apis/ApproveTable.js'
import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:true,
                branchid:null,
                updateMode:false,
                user:null,
                subjects:null,
                classrooms:null,
                classgroups:null,
                academicPeriods:null,
                table:null,
                tableKey:0
            }
    },

    methods: {
         getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getTable()                
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        datatable(){            
            $(function() {
                 $('#all-request').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getTable(){
            ApproveTable.getTable(this.user.branchid).then((result) => {
                this.table = result.data
                   this.datatable();
                })
        },

        approve(id){
           ApproveTable.approve(id).then((result) => {
                this.getTable()
                this.tableKey++
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Timetable Approved',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },

        disapprove(id){
            ApproveTable.disapprovetable(id).then((result) => {
                this.getTable()
                this.tableKey++
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Timetimetable not Approved',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {});
            
        },

        deleteTimetable(id){
            ApproveTable.deleteTimetable(id).then((result) => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Timetable Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.getTable()
                this.tableKey++
            })
        }
    },

    created() {  
        this.getAuth()        
    },

}
</script>


<template>
    <div>
        <h1>Timetable</h1>
        <section style="margin-bottom:50px">
            <center>
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Time Table Type</label>
                        <select v-model="timetable.timetabletype" @change="getClassGroupsRoom">
                            <option value="">select</option>
                            <option value="class_timetable">Class Timetable</option>
                            <option value="exam_timetable">Exam Timetable</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Academic Period</label>
                        <select v-model="timetable.academicPeriodid" @change="checkInput">
                            <option value="">select</option>
                            <option v-for="period in academicPeriods" :key="period.id"
                            :value="{periodid:period.id, periodsession:period.session.session, periodterm: period.term}">
                                {{ period.session.session }} - {{ period.term }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group" v-if="this.classgroups != null">
                            <label>Class Group</label>
                            <select v-model="timetable.classGroupId" @change="getClassGroupSubjects">
                                <option value="">select</option>
                                    <option v-for="group in classgroups" :key="group.id"
                                        :value="{classid:group.id, groupname:group.classgroupname}">
                                        {{ group.classgroupname }}
                                    </option>
                            </select>
                    </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group" v-if="this.classrooms != null">
                        
                            <label>Class Room</label>
                            <select v-model="timetable.classGroupId" @change="getClassGroupSubjects">
                                <option value="">select</option>
                                    <option v-for="room in classrooms" :key="room.classgroupid"
                                            :value="{classid:room.classgroupid, roomid:room.id, groupname:room.classgroupname, classroom:room.classroom }">
                                        {{ room.classgroupname }} - {{ room.classroom }}
                                    </option>
                            </select>
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                            <select v-model="timetable.subjectid" >
                                <option value="">select</option>
                                <option v-for="subject in subjects" :key="subject.id"
                                :value="{subjectid:subject.id, subjecttitle:subject.subjecttitle, subjectclass:subject.classgroupname}">
                                    {{ subject.subjecttitle }} - {{subject.classgroupname}}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Day</label>
                            <select v-model="timetable.day">
                                <option value="">select</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                        </div>
                </div>
                <div class="form-group-row">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" v-model="timetable.date">
                    </div>
                
                    <div class="form-group">
                        <label>From</label>
                        <input v-model="timetable.from" type="time" name="">
                    </div>
                    <div class="form-group">
                        <label>To</label>
                        <input type="time" name="" v-model="timetable.to">
                    </div>
                </div>
                    <button :disabled="checkFilled" class="btn btn-success mb-5" @click="addToTable()">
                        Add to table <i class="fas fa-plus-circle" aria-hidden="true"></i>
                    </button>
            </center>
        </section>
        <section>
        <center style="margin-bottom:25px">
        <button style=" background:green; margin-right:50px" class="btn btn-primary col-12 mb-2 mt-2 ml-2" @click="saveTimeTable()">
        Save Time Table <i class="fas fa-file" aria-hidden="true"></i></button>
        <button @click="appTable">Approve Time Table
        </button>
        </center>
            <table id="all-table">
            
                                    <thead>
                                       
                                        <tr>
                                            <th>Subject</th>
                                            <th>Class Group</th>
                                            <th>Day</th>
                                            <th>Academic Period</th>
                                            <th>Date</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Actions </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        
                                        <tr v-for="data in timetableArray" :key="data.id">
                                            <td>{{ data.subjectid['subjecttitle'] }} - {{ data.subjectid['subjectclass']}}</td>
                                            <td v-if="data.timetabletype == 'class_timetable'">{{ data.classGroupId['groupname'] }} - {{ data.classGroupId['classroom']}}</td>
                                            <td v-else>{{ data.classGroupId['groupname'] }}</td>
                                            <td>{{ data.day }}</td>
                                            <td>{{ data.academicPeriodid['periodterm'] }}</td>
                                            <td>{{ data.date }}</td>
                                            <td>{{ data.from }}</td>
                                            <td>{{ data.to }}</td>
                                            <td>
                                                 <button class="btn btn-danger" @click="deleteTimetable(data)">
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
import User from '../../apis/User'
import Timetable from '../../apis/Timetable'
import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:false,
                timetable:{
                    classRoomGroupid:"",
                    classGroupId:"",
                    timetabletype:"",
                    subjectid:"",
                    academicPeriodid:"",
                    from:"",
                    to:"",
                    day:"",
                    date:"",
                },
                timetableArray:[],
                branchid:null,
                updateMode:false,
                user:null,
                subjects:null,
                classrooms:null,
                classgroups:null,
                academicPeriods:null,


            }
    },

    methods: {   
        checkInput(){
            if(this.timetable.timetabletype !="" && this.timetable.subjectid !="" && this.timetable.from
&& this.timetable.to != "" && this.timetable.day != "" && this.timetable.date !=""){
    this.checkFilled =  false
}else{
    this.checkFilled = false
}
        },

        appTable(){
            this.$router.push('/approve-table')
        },
        datatable(){            
            $(function() {
                 $('#all-table').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                this.getAcademicPeriod()
                this.datatable()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
      getClassGroupsRoom(){
        //class_timetable exam_timetable
          if(this.timetable.timetabletype == 'class_timetable'){
              Timetable.getClassGroupsRoom(this.user.branchid).then((result) => {
                  this.classgroups = null
                  this.classrooms = result.data
              })
          }else{
              Timetable.getClassGroup(this.user.branchid).then((result) => {
                  this.classrooms = null
                  this.classgroups = result.data
              })
          }
      },
      getClassGroupSubjects(){
          Timetable.getClassGroupSubjects(this.timetable.classGroupId.classid).then((result) => {
              this.subjects = result.data
          })
      },
        getAcademicPeriod(){
            Timetable.getAcademicPeriod(this.user.branchid).then((result) => {
                this.academicPeriods = result.data
            })
        },

        addToTable(){
            //push to array
            this.timetableArray.push({
                 classRoomGroupid:this.timetable.classRoomGroupid,
                    classGroupId:this.timetable.classGroupId,
                    timetabletype:this.timetable.timetabletype,
                    subjectid:this.timetable.subjectid,
                    academicPeriodid:this.timetable.academicPeriodid,
                    from:this.timetable.from,
                    to:this.timetable.to,
                    day:this.timetable.day,
                    date:this.timetable.date,
                    branchid:this.user.branchid
            })
        },

        deleteTimetable(data){
            var index = this.timetableArray.indexOf(data)
            this.timetableArray.splice(index,1)

        },

        saveTimeTable(){
            Timetable.saveTimeTable(this.timetableArray).then(() => {
                this.timetableArray = []
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Timetable Saved',
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
<style scoped>
    .form-group-row{
		display: flex;
        position: relative;
        justify-content: center;        
	}

    .form-group input, select{
        position:relative ;
        width: 300px;
        margin-right: 10px;
    }

    .img-container{
        max-width: 100px;
        max-height: 100px;
        border-radius: 10%;        
        overflow: hidden;
    }   
    .img-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width:992px) {
    .form-group-form-group-row{
		display: block;
        position: relative;        
	}
    
            
    }
</style>




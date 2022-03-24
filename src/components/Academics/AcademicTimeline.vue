<template>
    <div>
        <h1>Academic Timeline</h1>  
        <section style="margin-left:10px; margin-top:10px;margin-right:30px">
            <div class="form-group-row">
                <div class="form-group" style="border:1px solid #333;  border-radius:20px;  padding:10px; margin-right:20px">
                    <label>Academic Year</label>
                    <input type="text" placeholder="..." v-model="newYear.year" @input="checkInput">
                    <center>
                        <button style="background:brown"  @click.prevent=addYear :disabled="this.checkFilled == true && this.newYear.year == null || this.newYear.year == ''">
                            Add</button>
                    </center>
                </div>

                <div class="form-group" style="border:1px solid #333;  border-radius:20px;  padding:10px;">
                    <label>Term</label>
                    <input type="text" placeholder="..." v-model="newTerm.term" @input="checkInput">
                    <center>
                        <button style="background:brown" @click.prevent=addTerm :disabled="this.checkFilled == true && this.newTerm.term == null || this.newTerm.term == ''">
                            Add </button>
                    </center>
                </div>
            </div>
        </section>  
        
        <section style="margin-top:50px"> 
            <center style="border:1px solid #333;  border-radius:20px;  padding:5px;">
                <div class="form-group-row" >
                    <div class="form-group">
                        <label>Academic Session</label>
                        <input type="text" placeholder="yyyy/yyyy" v-model="newSession.session" @input="checkInput"><br/>
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input type="date" placeholder="..." v-model="newSession.startdate" @input="checkInput">
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input type="date" placeholder="..." v-model="newSession.enddate" @input="checkInput">
                    </div>
                </div>
                    <button @click.prevent=addSession :disabled="this.checkFilled == true && this.newSession.session == null || this.newSession.session == ''">
                        Add</button>
                        
            </center>
        </section>      
        <section style="margin-top:50px; margin-bottom:50px;">
            <center>
                <h3>Academic Period</h3>
                <div class="form-group-row">
                      <div class="form-group">
                            <label >Academic Year</label>
                            <select v-model="academicPeriod.yearid" @change="checkInput">
                                <option value="">select</option>
                                <option v-for="year in years" :key="year.id" :value="year.id">
                                    {{ year.year }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                                <label >Term</label>
                                <select v-model="academicPeriod.termid" @change="checkInput">
                                    <option value="">select</option>
                                    <option v-for="term in terms" :key="term.id" :value="term.id">
                                        {{ term.term }}
                                    </option>
                                </select>
                            </div>

                </div>
                <div class="form-group-row">
                    <div class="form-group">
                                <label >Session</label>
                                <select v-model="academicPeriod.sessionid" @change="checkInput">
                                    <option value="">select</option>
                                    <option v-for="session in sessions" :key="session.id" :value="session.id">
                                        {{ session.session }}
                                    </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label >Next Resumption Date</label>
                                <input type="date" v-model="academicPeriod.next_resumption" @change="checkInput">
                            </div>
                </div>                    
                <button style="background:orange"  @click.prevent=addAcademicPeriod :disabled="this.checkFilled == true && this.newYear.year == null || this.newYear.year == ''">Add</button>                                            

            </center>
        </section>                     
    </div>
</template>

<script>
import User from '../../apis/User'
import Timeline from '../../apis/Timeline'
import Swal from 'sweetalert2'
export default {    
    data() {
        return {
                checkFilled:true,
                newYear:{
                    year:null,
                },
                newSession:{
                    session:null,
                    startdate:null,
                    enddate:null

                },
                newTerm: {
                    term:null
                },
                updateMode:false,
                ranks:[],
                user:null,
                rankid:null,
                sessions:null,
                terms:null,
                years:null,
                academicPeriod:{
                    sessionid:null,
                    termid:null,
                    yearid:null,
                    next_resumption:null
                }
            }
    },

    methods: {
        checkInput(){
            if(this.newYear.year != null){
                this.checkFilled = false
            }else if(this.newSession.session != null && this.newSession.startdate != null && this.newSession.enddate){
                this.checkFilled = false
            }else if(this.newTerm.term != null ){
                this.checkFilled = false
            }else if(this.academicPeriod.sessionid != null && this.academicPeriod.termid != null && this.academicPeriod.yearid != null && this.academicPeriod.next_resumption != null){
                this.checkFilled = false
            }else {
                this.checkFilled = true
            }
        },

        addYear(){
            var post = [this.newYear, this.user]
            Timeline.addYear(post).then((result) => {
                this.getTimeline()
                this.newYear.year = null
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Academic year added',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Academic year not Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        addTerm(){
            var post = [this.newTerm, this.user]
             Timeline.addTerm(post).then((result) => {
                this.getTimeline()
                this.newTerm.term = null
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Term added',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Term not Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        addSession(){
            var post = [this.newSession, this.user]
             Timeline.addSession(post).then((result) => {
                this.getTimeline()
                this.newSession.session = null
                this.newSession.startdate = null
                this.newSession.enddate = null
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Academic session added',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Academic session not Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },

        getSessions(){
            Timeline.getSessions(this.user.branchid).then((result) => {
                this.sessions = result.data
            }).catch((err) => {

            });
        },

        getTerm(){
            Timeline.getTerm(this.user.branchid).then((result) => {
                this.terms = result.data
            }).catch((err) => {

            });
        },

        getYears(){
            Timeline.getYears(this.user.branchid).then((result) => {
                this.years = result.data
            }).catch((err) => {

            });
        },

        addAcademicPeriod(){
            Timeline.addAcademicPeriod(this.academicPeriod).then((result) => {
                Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Academic period added',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
                     this.academicPeriod.sessionid = null
                    this.academicPeriod.termid = null
                    this.academicPeriod.yearid = null
            }).catch((err) => {
                Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Academic period not added',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            });
        },
        getTimeline(){
            this.getSessions()
            this.getTerm()
            this.getYears()
        },        
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data  
                 this.getSessions()
                this.getTerm()
                this.getYears()
            }).catch(()=>{
				this.$router.push('/')
			})
        },        
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

    .form-group-row input, select{
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
    .form-group-row{
		display: block;
        position: relative;        
	}
            
    }
</style>


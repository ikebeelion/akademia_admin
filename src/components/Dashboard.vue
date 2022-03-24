<template>
    <div :key="chartKey">        
        <div class="cardBox">
			<div class="card">
				<div>
					<div class="numbers">{{ studentCount }}</div>
					<div class="cardName">Students</div>
				</div>
				<div class="iconBox">					
					<i class="fa fa-user-graduate"></i>
				</div>
			</div>

			<div class="card">
				<div>
					<div class="numbers">{{ staffCount.toLocaleString() }}</div>
					<div class="cardName">Staff</div><br>										
				</div>
				<div class="iconBox">
				 <i class="fas fa-user"></i>											
				</div>
			</div>

			<div class="card">
				<div>
					<div class="numbers">{{teachingStaffCount}}</div>
					<div class="cardName">Teachers</div>
				</div>
				<div class="iconBox">
					<i class="fas fa-chalkboard-teacher"></i>
				</div>
			</div>

			<div class="card">
				<div>
					<div class="numbers">{{nonTeachingStaffCount}}</div>
					<div class="cardName">Non Teachers</div>
				</div>
				<div class="iconBox">
					<i class="fas fa-user-times"></i>
				</div>
			</div>
		</div>
		<div class="chartBox">
			<div class="card">
				<apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
			</div>
			<div class="card">			
				<apexchart type="bar" height="350" :options="bchartOptions" :series="bseries"></apexchart>
			</div>
		</div>
	
    



    </div>
</template>

<script>
import User from '../../src/apis/User.js'
import Dashboard from '../../src/apis/Dashboard.js'
export default {
    data() {
        return {
			
			user:[],
            studentCount:0,
            staffCount:0,
            parentCount:0,
			teachingStaffCount:0,
			nonTeachingStaffCount:0,
			maleStudents:0,
			femaleStudents:0,
			chartKey:0,
			paidFees:0,
			unpaidFees:0,
			incompleteFees:0,
          series: [],
          chartOptions: {
            chart: {
              width: 500,
              type: 'pie',
            },
            labels: ['Male Students', 'Female Students'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }],
            

        },
			bseries: [{
            data: []
          }],
          bchartOptions: {
            bchart: {
              type: 'bar',
              height: 350
            },
            bplotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            bdataLabels: {
              enabled: true
            },
            xaxis: {
              categories: ['Paid Fees', 'Unpaid Fees', 'Incomplete Fees'],

		}
		}
		}
    },
    methods: {
        getStudentCount(){
            Dashboard.getStudentCount(this.user.branch.schoolid).then((result) => {
                this.studentCount = result.data
            })
        },
		getStaffCount(){
			Dashboard.getStaffCount(this.user.branch.schoolid).then((result) => {
				this.staffCount = result.data
			})
		},
		getTeachingStaffCount(){
			Dashboard.getTeachingStaffCount((this.user.branch.schoolid)).then((result)=>{
				this.teachingStaffCount = result.data
			})
		},
		getNonTeachingStaffCount(){
			Dashboard.getNonTeachingStaffCount((this.user.branch.schoolid)).then((result)=>{
				this.nonTeachingStaffCount = result.data
			})
		},
		getMaleStudents(){
			Dashboard.getMaleStudents((this.user.branch.schoolid)).then((result)=>{
				this.maleStudents = result.data			
				this.chartKey++
				this.series[0] = this.maleStudents
			})
		},
		getFemaleStudents(){
			Dashboard.getFemaleStudents(this.user.branch.schoolid).then((result)=>{
				this.femaleStudents = result.data
				this.series[1] = this.femaleStudents
			})
		},
		getPaidFees(){
			Dashboard.getPaidFees(this.user.branch.schoolid).then((result) =>{
				this.paidFees = result.data
				this.bseries[0].data[0] = this.paidFees
			})
		},
		getUnpaidFeess(){
			Dashboard.getUnpaidFees(this.user.branch.schoolid).then((result) =>{
				this.unpaidFees = result.data
				this.bseries[0].data[1] = this.unpaidFees
			})
		},
		getIncompleteFeess(){
			Dashboard.getIncompleteFees(this.user.branch.schoolid).then((result) =>{
				this.incompleteFees = result.data
				this.bseries[0].data[2] = this.incompleteFees
			})
		},

		loadAll(){			
            this.getStudentCount()
			this.getStaffCount()
			this.getTeachingStaffCount()
			this.getNonTeachingStaffCount()

			this.getMaleStudents()
			this.getFemaleStudents()
			this.getPaidFees(),
			this.getUnpaidFeess(),
			this.getIncompleteFeess(),
			this.chartKey++				
		}
		// getFemaleStaff(){
		// 	//
		// },
		// getMaleStaff(){
		// 	//
		// }
    },  
    created() {
        User.auth().then((result)=>{			
            this.user = result.data            	
			this.loadAll()			
        })	

    },

	

}
</script>
<style scoped>
	.cardBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
	}
	.chartBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px;
	}

	.chartBox .card {
		position: relative;
		background: #fff;		
		display: flex;
		padding: 20px;
		justify-content: space-between;
		cursor: pointer;	
	}

	.cardBox .card {
		position: relative;
		background: #fff;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		cursor: pointer;	
	}

	.cardBox .card .numbrs{
		position: relative;
		font-size: 2em;
		font-weight: 500;
	}

	.cardBox .card .cardName{
		color: #999
	}

	.cardBox .card .iconBox{
		font-size: 2.5em;
		color: #0a2b3a;
	}	

	@media (max-width:992px){
		.cardBox{
			display:block;
		}	
		.chartBox{
			display: block;
		}
	}
</style>
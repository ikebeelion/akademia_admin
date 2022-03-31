import { createRouter, createWebHistory } from 'vue-router'
import Subject from './components/Academics/Subject.vue'
import Dashboard from './components/Dashboard.vue'
import ClassGroups from './components/Academics/ClassGroups.vue'
import ClassRoom from './components/Academics/ClassRooms.vue'
import Parent from './components/Parent/ParentProfile.vue'
import Staff from './components/Staff/StaffProfile.vue'
import Student from './components/Student/StudentProfile.vue'
import Pastoral from './components/Pastoral/BoardingDetails.vue'
import Calendar from './components/Pastoral/Calendar.vue'
import BulkSms from './components/Communication/BulkSms.vue'
import Pyschomotor from './components/Student/PsychomotorDomain.vue'
import Affective from './components/Student/AffectiveDomain.vue'
import Login from './components/Auth/Login.vue'
import RoomGroup from './components/Academics/ClassromGroups.vue'
import School from './components/School/School.vue'
import Branch from './components/School/Branch.vue'
import SubjectGroup from './components/Academics/SubjectGroup.vue'
import Timeline from './components/Academics/AcademicTimeline.vue'
import ResultType from './components/Academics/ResultType.vue'
import TimeTable from './components/Academics/TimeTable.vue'
import Position from './components/Staff/Position.vue'
import ApproveTable from './components/Academics/ApproveTable'
import Promote from './components/Academics/Promote.vue'

const router = createRouter({
    history: createWebHistory(),    
    routes: [
        {path:'/', name:'login', component:Login},
        {path:'/dashboard', name:'dashboard', component:Dashboard},
        {path:'/subjects', name:'subject', component:Subject},
        {path:'/classgroups', name:'classgroups', component:ClassGroups},
        {path:'/classroom', name:'classroom', component:ClassRoom},
        {path:'/parent', name:'parent', component:Parent},
        {path:'/student', name:'student', component:Student},
        {path:'/staff', name:'staff', component:Staff},
        {path:'/pastoral', name:'pastoral', component:Pastoral},
        {path:'/calendar', name:'calendar', component:Calendar},
        {path:'/sms', name:'bulksms', component:BulkSms},
        {path:'/domain', name:'pyschomotor', component:Pyschomotor},
        {path:'/affective', name:'affective', component:Affective},
        {path:'/room-group', name:'roomgroup', component:RoomGroup},
        {path:'/school', name:'school', component:School},
        {path:'/branch', name:'branch', component:Branch},
        {path:'/subjectgroup', name:'subjectgroup', component:SubjectGroup},
        {path:'/position', name:'position', component:Position},
        {path:'/timeline', name:'timeline', component:Timeline},
        {path:'/resulttype', name:'resulttype', component:ResultType},
        {path:'/timetable', name:'timetable', component:TimeTable},
        {path:'/approve-table', name:'approvetable', component:ApproveTable},                       
        {path:'/promote', name:'promote', component:Promote},                       
    ]
})

export default router


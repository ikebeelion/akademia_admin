<template>
    <div>
        <h1>All Classrooms</h1>
        <center>
            <p>Listed Below are all the available classrooms in this school</p>
        </center>
         <table id="all-classrooms">
            <thead>
                <tr>
                    <th>Class Group</th>
                    <th>Class Room</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="roomgroup in classroomgroups" :key="roomgroup.id">
                    <td>{{roomgroup.classgroupname}}</td>
                    <td>{{roomgroup.classroom}}</td>
                    <td>
                        <button style="background:green" @click.prevent="$emit('addClassRoomGroup',roomgroup.id, roomgroup.classroom, roomgroup.classgroupname)">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
<div v-if="this.allclassroomgroups != ''">
    <table>
        <thead>
            <tr>
                <th>Class Group</th>
                <th>Class Room</th>
                <th>Action</th>|
            </tr>
        </thead>
        <tbody>
        <tr v-for="roomgroup in allclassroomgroups" :key="roomgroup.id">
            <td><center>{{roomgroup.classgroup}}</center></td>
            <td><center>{{roomgroup.classroom}}</center></td>
            <td>
                <button style="background:red" @click.prevent="$emit('deleteallclassroomgroups', roomgroup)">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    </tbody>
</table>
<center style="margin-top:20px">
    <button style="background:green" @click.prevent="$emit('saveClassRoomTeacherAssign')">
        Save
    </button>
    </center>
</div>
</div>
</template>

<script>
export default {
    props:{
        classroomgroups:null,
        allclassroomgroups:[]
    }    
}
</script>
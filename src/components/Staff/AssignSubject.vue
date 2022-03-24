<template>
    <div>          
    <h1>All Subjects</h1>
        <center>
            <p>Listed Below are all the registered subjects in this school</p>
        </center>
        <table id="all-subjectgroups" class="table table-bordered dt-responsive nowrap w-100">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Class Group</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="subjectgroup in subjectgroups" :key="subjectgroup.id">
                    <td><center>{{subjectgroup.subjecttitle}}</center></td>
                    <td><center>{{subjectgroup.classgroupname}}</center></td>
                    <td>
                        <button style="background:green" @click.prevent="$emit('addSubject', subjectgroup.id, subjectgroup.subjecttitle, subjectgroup.classgroupname)" >
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="this.allsubjectgroups != ''">
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Class Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="subject in allsubjectgroups" :key="subject.id">
                    <td><center>{{subject.subject}}</center></td>
                    <td><center>{{subject.class}}</center></td>
                    <td>
                        <button id="background:red" @click.prevent="$emit('deleteallsubjectgroups', subject)">
                            <i class="fas fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <center style="margin-top:2%" v-if="allsubjectgroups">
        <button style="background:green" @click.prevent="$emit('saveSubjectAssign')">Save</button>
    </center>
    </div>
    
    </div>

</template>
<script>
export default {
    props:{
        subjectgroups:null,
        allsubjectgroups:[]
    }
}
</script>
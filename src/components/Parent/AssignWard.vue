 <div id="ward-modal" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="transaction-detailModalLabel">Add Ward</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- end row -->
                                <div class="form-group-row">
                                        <div class="col-12">
                                            <div class="card">
                                                <div class="card-body">

                                                    <h1 class="card-title">All Students</h1>
                                                    <p class="card-title-desc">Listed Below are all the registered students in this school
                                                    </p>
                                                    <div class="table-responsive">
                                                        <table id="all-students" class="table table-bordered dt-responsive nowrap w-100">
                                                            <thead>
                                                            <tr>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Class Group</th>
                                                                <th>Enrollment Date</th>
                                                                <th>Gender</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr v-for="student in students" :key="student.id">
                                                                <td>{{student.firstname}}</td>
                                                                <td>{{student.lastname}}</td>
                                                                <td>{{student.class_group.classgroupname}}</td>
                                                                <td>{{student.enrollmentdate}}</td>
                                                                <td>{{student.genderid}}</td>
                                                                <td>
                                                                    <button class="btn btn-success" @click.prevent="addWard(student.studentuseraccountid, student.firstname, student.lastname, student.class_group.classgroupname,student.genderid)" data-toggle="tooltip" data-placement="top" title="This is my child">
                                                                        <i class="fas fa-plus-circle" aria-hidden="true"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="form-group-row" v-if="this.newWard != ''">
                                    <table class="table table-bordered dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Class Group</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ward in newWard" :key="ward.id">
                                                <td>{{ward.firstname}}</td>
                                                <td>{{ward.lastname}}</td>
                                                <td>{{ward.classgroupname}}</td>
                                                <td>
                                                    <button class="btn btn-danger" @click.prevent="removeFromWard(ward)">
                                                        <i class="fas fa-trash" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" @click.prevent="saveWard">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
        </div>
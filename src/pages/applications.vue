<script setup lang="ts">

import {onMounted, ref} from "vue";

let entityList = ref<any[]>([]);

const downloadResume = () => {
  alert('Download resume');
};

const editApplication = (entity) => {
  dialogEntity.value = entity;
  dialog.value = true;
};

const deleteApplication = (id) => {
  fetch("http://localhost:8000/applications/" + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      entityList.value = entityList.value.filter(item => item.id !== id);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

/* On mounted */
onMounted(() => {
  // Fetch the content from the server
  fetch("http://localhost:8000/applications", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if(data.detail === 'Could not validate credentials'){
        window.location.href = '/login';
      }
      entityList.value = data.data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

const newApplication = () => {
  dialogEntity.value = {};
  dialog.value = true;
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// DIALOG
let dialogEntity = ref<any>({});
let dialog = ref(false);

// EXPORT AS CSV
const exportCSV = () => {
  fetch('http://localhost:8000/applications/export', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'applications.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

</script>

<template>
  <v-container class="fill-height">
    <v-responsive
        class="align-centerfill-height mx-auto"
        max-width="900"
    >
        <v-img
          class="mb-4"
          height="150"
          src="@/assets/logo.png"
        />
      <div class="text-center">
        <h4 class="text-h4 font-weight-bold">Application list</h4>
        <br/><br/><br/>
      </div>
      <div class="top-button-group">
        <v-btn
          color="success"
          @click="exportCSV"
        >
          <!-- icon -->
          <v-icon left>mdi-file-export</v-icon>
          Export as CSV
        </v-btn>
        <v-btn
          color="primary"
          @click="newApplication"
        >
          <v-icon left>mdi-plus</v-icon>
          New Application
        </v-btn>
        <v-btn
          color="primary"
          @click="logout"
        >
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </div>
      <v-table>
        <thead>
          <tr>
            <td>#</td>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Expected Salary</th>
            <th>Resume</th>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entity in entityList" :key="entity.id">
            <td>{{ entity.id }}</td>
            <td>{{ entity.firstname }}</td>
            <td>{{ entity.lastname }}</td>
            <td>{{ entity.email }}</td>
            <td>{{ entity.phone }}</td>
            <td>{{ entity.address }}</td>
            <td>{{ entity.expected_salary }}</td>
            <td>
              <v-btn
                color="primary"
                @click="downloadResume"
              >
                <v-icon left>mdi-download</v-icon>
                Download
              </v-btn>
            </td>
            <td>
              <v-btn
                color="primary"
                @click="editApplication(entity)"
              >
                <v-icon left>mdi-pencil</v-icon>
                Edit
              </v-btn>
              <v-btn
                color="error"
                @click="deleteApplication(entity.id)"
              >
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
            </td>
        </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>

  <!-- Dialog for item update -->
  <v-dialog
      max-width="500"
      v-model="dialog"
  >
    <v-card class="pa-5">
      <v-card-title>
        <!-- centered -->
        <div >New Application</div>
      </v-card-title>
      <v-card-text>
        <ApplicationForm :entity="dialogEntity"></ApplicationForm>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.top-button-group{
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin-bottom: 1em;
  margin-top: 1em;
}


</style>
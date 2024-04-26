<script setup lang="ts">
import { ref } from 'vue'
import {prepareFormData} from "../utils";

let firstName = ref('')
let lastName = ref('')
let email = ref('')
let phone = ref('')
let address = ref('')
let expectedSalary = ref('')
let resume = ref('')

const submitApplication = () => {
  console.log('submitApplication')
  // Send POST a request to http://localhost:8000/applications with form data
  let data = {
    firstname: firstName.value, // Warning in typo
    lastname: lastName.value, // Warning in typo
    email: email.value,
    phone: phone.value,
    address: address.value,
    expected_salary: expectedSalary.value,
    resume: resume.value
  }
  console.debug("Bearer " + localStorage.getItem('token'))
  /*fetch("http://localhost:8000/applications", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: prepareFormData(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Redirect to home page
    })
    .catch((error) => {
      console.error('Error:', error);
    });*/
  // Send as JSON
  fetch("http://localhost:8000/applications", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Redirect to home page
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

</script>

<template>
  <v-container class="fill-height">
    <v-responsive
        class="align-centerfill-height mx-auto"
        max-width="900"
    >
      <v-form>
        <v-text-field
          label="First Name"
          outlined
          v-model="firstName"
          :rules="[v => !!v || 'First Name is required']">
        </v-text-field>
        <v-text-field
          label="Last Name"
          outlined
          v-model="lastName"
          :rules="[v => !!v || 'Last Name is required']">
        </v-text-field>
        <v-text-field
          label="Email"
          outlined
          v-model="email"
          :rules="[v => !!v || 'Email is required']">
        </v-text-field>
        <v-text-field
          label="Phone"
          outlined
          v-model="phone"
          :rules="[v => !!v || 'Phone is required']">
        </v-text-field>
        <v-text-field
          label="Address"
          outlined
          v-model="address"
          :rules="[v => !!v || 'Address is required']">
        </v-text-field>
        <v-text-field
          label="Expected Salary"
          outlined
          v-model="expectedSalary"
          :rules="[v => !!v || 'Expected Salary is required']">
        </v-text-field>
        <v-file-input
          label="Resume"
          outlined
          v-model="resume"
          :rules="[v => !!v || 'Resume is required']">
        </v-file-input>
        <v-btn
          block
          color="primary"
          @click="submitApplication"
        >
          Send
        </v-btn>
      </v-form>

    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
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
    id: props.entity.id,
    firstname: firstName.value, // Warning in typo
    lastname: lastName.value, // Warning in typo
    email: email.value,
    phone: phone.value,
    address: address.value,
    expected_salary: expectedSalary.value,
    resume: resume.value
  }
  if(data.id !== undefined) {
    fetch("http://localhost:8000/applications", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }else{
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
}

// The properties
const props = defineProps(['entity'])

onMounted(() => {
  console.log('Entity:', props.entity)
  // Patch to the form
  firstName.value = props.entity.firstname
  lastName.value = props.entity.lastname
  email.value = props.entity.email
  phone.value = props.entity.phone
  address.value = props.entity.address
  expectedSalary.value = props.entity.expected_salary
  resume.value = props.entity.resume
})
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>

</style>
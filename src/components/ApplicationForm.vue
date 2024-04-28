<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {prepareFormData, registerFeedback} from "../utils";

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
          registerFeedback('Application updated successfully', 'success')
          window.location.reload();
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
          registerFeedback('Application submitted successfully', 'success')
          window.location.reload();
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

// The form validation
const buttonDisabled = computed(() => {
  return !firstName.value || !lastName.value || !email.value || !phone.value || !expectedSalary.value
})

</script>

<template>
  <div>
    <v-responsive
        class="align-centerfill-height mx-auto"
        max-width="900"
    >
      <v-form class="form">
        <v-text-field
          label="First Name (Required)"
          outlined
          v-model="firstName"
          :rules="[v => !!v || 'First Name is required']">
        </v-text-field>
        <br/>
        <v-text-field
          label="Last Name (Required)"
          outlined
          v-model="lastName"
          :rules="[v => !!v || 'Last Name is required']">
        </v-text-field>
        <br/>
        <v-text-field
          label="Email (Required)"
          outlined
          v-model="email"
          :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
        >
        </v-text-field>
        <br/>
        <v-text-field
          label="Phone (Required)"
          outlined
          v-model="phone"
          :rules="[v => !!v || 'Phone is required', v => /^\+?[0-9]+$/.test(v) || 'Phone must be valid']"
        >
        </v-text-field>
        <br/>
        <v-text-field
          label="Address"
          outlined
          v-model="address"
          :rules="[v => !!v || 'Address is required']">
        </v-text-field>
        <br/>
        <v-text-field
          label="Expected Salary (Required)"
          type="number"
          outlined
          v-model="expectedSalary"
          :rules="[v => !!v || 'Expected Salary is required']">
        </v-text-field>
        <br/>
        <v-file-input
          label="Resume"
          outlined
          v-model="resume"
          :rules="[v => !!v || 'Resume is required']">
        </v-file-input>
        <br/>
        <v-btn
          block
          color="primary"
          @click="submitApplication"
          :disabled="buttonDisabled"
        >
          Send
        </v-btn>
      </v-form>

    </v-responsive>
  </div>
</template>

<style scoped>
.form{
  line-height: .5em;
}
</style>
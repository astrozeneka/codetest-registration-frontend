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
        <h4 class="text-h4 font-weight-bold">Welcome</h4>
        <br/><br/><br/>
      </div>
      <v-form>
        <v-text-field
          label="Email"
          outlined
          prepend-inner-icon="mdi-email"
          v-model="email"
        />
        <v-text-field
          label="Password"
          outlined
          prepend-inner-icon="mdi-lock"
          v-model="password"
          type="password"
        />
        <v-btn
          block
          color="primary"
          @click="login"
        >
          Login
        </v-btn>
      </v-form>

    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {prepareFormData} from "../utils";
let email = ref('');
let password = ref('');
function login() {
  console.log("Click login")
  console.log('Email:', email.value);
  let data = {
    username: email.value,
    password: password.value
  }

  // Send a POST request to http://localhost:8000/token to exchange credential to token using form data
  fetch('http://localhost:8000/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: prepareFormData(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      localStorage.setItem('token', data.access_token);
      // Redirect to home page
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>
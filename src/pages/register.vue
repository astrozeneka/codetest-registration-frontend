<script setup lang="ts">

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
        <h4 class="text-h4 font-weight-bold">Register application</h4>
        <br/><br/><br/>
      </div>
      <ApplicationForm :entity="{}"></ApplicationForm>
      <p class="pa-5">
        Go back to <router-link to="/">Home</router-link>
      </p>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
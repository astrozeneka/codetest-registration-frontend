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
        <h4 class="text-h4 font-weight-bold">Welcome</h4>
        <br/><br/><br/>
      </div>
      <div class="menu-button-group">
        <v-btn
          color="primary"
          href="/login"
        >
          Login as admin
        </v-btn>
        <v-btn
          color="primary"
          href="/register"
        >
          Register
        </v-btn>
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
.menu-button-group{
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
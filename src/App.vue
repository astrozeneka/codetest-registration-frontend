<template>
  <v-app>
    <v-main>
      <router-view/>

      <!-- snackbar -->
      <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          :color="snackbarColor"
          top
      >
        {{ snackbarMessage }}
      </v-snackbar>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  // Run some part of code when the route changes
  import {useRouter} from "vue-router";
  import {onMounted, ref, watch} from "vue";

  const router = useRouter();
  watch(router.currentRoute, () => {
    // check if there are some feedback on the localStorage
    if(localStorage.getItem('feedback')){
      let feedback:any = JSON.parse(localStorage.getItem('feedback'));
      snackbarMessage.value = feedback.message
      snackbarColor.value = feedback.color || 'info';
      snackbar.value = true;
      localStorage.removeItem('feedback');
    }else{
      snackbar.value = false;
    }
  });

  // Manage the snackbar
  const snackbar = ref(false);
  const snackbarMessage = ref('Hello world');
  const snackbarColor = ref('success');


</script>
<style>

a{
  text-decoration: none;
}
</style>
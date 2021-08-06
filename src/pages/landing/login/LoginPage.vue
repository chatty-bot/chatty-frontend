<template>
  <div class="section">
    <div class="container">
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script lang="ts">
import LoginForm from "./LoginForm.vue";
import Vue from "vue";
export default Vue.extend({
  name: "LoginPage",
  components: { LoginForm }
});
</script>

<style>
</style>
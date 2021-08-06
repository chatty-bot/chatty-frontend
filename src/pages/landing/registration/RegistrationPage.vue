<template>
  <div class="section">
    <div class="container">
      <RegistrationForm></RegistrationForm>
    </div>
  </div>
</template>

<script lang="ts">
import RegistrationForm from "./RegistrationForm.vue";
import Vue from "vue";
export default Vue.extend({
  components: { RegistrationForm }
});
</script>

<style>
</style>
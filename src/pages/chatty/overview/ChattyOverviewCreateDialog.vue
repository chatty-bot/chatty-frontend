<template>
  <div class="tile is-parent">
    <div class="tile is-child">
      <div class="card equal-height box ">
        <div class="card-content">
          <div class="content has-text-centered">
            <b-icon icon="code-branch" size="is-large"></b-icon>
          </div>
          <p>Create conversational data that acts as source for your chatbot</p>
        </div>
        <footer class="card-footer">
          <b-button
            type="is-primary"
            size="is-medium"
            expanded
            @click="$emit('create-dialog')"
          >Create dialog</b-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
</style>
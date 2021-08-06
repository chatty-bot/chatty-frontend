<template>
  <div class="tile is-parent">
    <div class="tile is-child">
      <div class="card equal-height box">
        <div class="card-content">
          <div class="content has-text-centered">
            <b-icon icon="comment-dots" size="is-large" custom-class="mb-3"></b-icon>
          </div>
          <p>Check your chatbot and see how it performs.</p>
        </div>

        <footer class="card-footer">
          <b-button
            size="is-medium"
            type="is-primary"
            expanded
            @click="$emit('start-chatbot')"
          >Start chatbot</b-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
</style>
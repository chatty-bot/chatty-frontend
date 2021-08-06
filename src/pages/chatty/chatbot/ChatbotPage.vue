<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6">
          <ChatbotWindow></ChatbotWindow>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ChatbotWindow from "./ChatbotWindow.vue";

@Component({
  components: { ChatbotWindow }
})
export default class ChatbotPage extends Vue {}
</script>

<style>
</style>
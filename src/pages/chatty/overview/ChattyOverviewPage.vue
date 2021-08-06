<template>
  <div>
    <section class="hero is-primary is-small">
      <div class="hero-body">
        <div class="container">
          <p class="title">Chatty</p>
          <p
            class="subtitle"
          >Platform for generating Chatbots. Create conversational data and instantly use it in your chatbot.</p>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="columns">
          <ChattyOverviewClassifyText class="column is-3"></ChattyOverviewClassifyText>
          <!--<ChattyOverviewStartChatbot class="column" ></ChattyOverviewStartChatbot>-->
          <!--<ChattyOverviewCreateDialog class="column"></ChattyOverviewCreateDialog>-->
          <ChattyOverviewAnswerSelection class="column is-3"></ChattyOverviewAnswerSelection>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChattyOverviewClassifyText from "./ChattyOverviewClassifyText.vue";
import ChattyOverviewStartChatbot from "./ChattyOverviewStartChatbot.vue";
import ChattyOverviewCreateDialog from "./ChattyOverviewCreateDialog.vue";
import ChattyOverviewAnswerSelection from "./ChattyOverviewAnswerSelection.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    ChattyOverviewClassifyText,
    ChattyOverviewAnswerSelection
  },
  methods: {
    onAnswerSelection() {}
  }
});
</script>

<style>
</style>
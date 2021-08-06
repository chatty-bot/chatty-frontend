<template>
  <div>
    <div class="box chatbot-window" ref="container">
      <div class="section" v-for="(message,idx) in messages" :key="idx">
        <ChatbotMessage :issuer="message.issuer" :message="message.message"></ChatbotMessage>
      </div>
      <div class="section" v-if="isTyping">
           <pulse-loader :loading="isTyping" :color="'#0077b6'"></pulse-loader>
      </div>
   
    </div>
    <ChatbotInput class="stick-bottom" v-on:submit="onSubmit"></ChatbotInput>
    <!---->
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import ChatbotInput from "./ChatbotInput.vue";
import ChatbotMessage from "./ChatbotMessage.vue";
import { Issuer } from "../../../client/chatty/models";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
@Component({
  components: { ChatbotInput, ChatbotMessage, PulseLoader }
})
export default class ChatbotWindow extends Vue {
  messages = [];
  get _messages() {
    return this.messages;
  }
  beliefState = {};
  systemActs = [];
  isTyping = false;

  @Watch("messages")
  onMessageAdded(val, oldVal) {
    this.$nextTick(function() {
      // DOM updated
      let container = this.$refs.container;
      container.scrollTop = container.scrollHeight;
    });
  }

  onSubmit(message) {
    this.isTyping = true;
    let chatbotRequest = {
      txtClfId: 100000,
      dstId: 1,
      seq2SeqId: 1,
      answSelId: 100000,
      message: message,
      systemActs: this.systemActs,
      beliefState: this.beliefState
    };
    this.messages.push({ message: message, issuer: Issuer.USER });
    setTimeout(() => {
      this.$http
        .post("http://localhost:18080/gateway/chatbot/", chatbotRequest)
        .then(({ data }) => {
          this.messages.push({ message: data.response, issuer: Issuer.SYSTEM });
          this.beliefState = data.beliefState;
          this.systemActs = data.systemActs;
          this.isTyping = false;
        });
    }, 1000);
  }
}
</script>

<style scoped>
.chatbot-window {
  height: 400px;
  max-height: 400px;
  overscroll-behavior-y: auto;
  overflow-y: auto;
}
</style>
<template>
  <div class="box" :class="computeColor">
    <p :class="computeTextColor">{{message}}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { Issuer } from "../../../client/chatty/models";
@Component
export default class ChatbotMessage extends Vue {
  @Prop(String) issuer!: string;
  @Prop(String) message!: string;

  get computeColor() {
    return {
      "has-background-primary": this.issuer == Issuer.SYSTEM,
      "is-pulled-right": this.issuer == Issuer.USER,
      "is-pulled-left": this.issuer == Issuer.SYSTEM
    };
  }

  get computeTextColor(){
      return{
          'has-text-white': this.issuer == Issuer.SYSTEM
      }
  }
}
</script>

<style>
</style>
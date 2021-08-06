<template>
  <div>
    <b-field grouped>
      <b-input expanded v-on:keyup.native.enter="onSubmit" v-model="userInput"></b-input>
      <b-button type="is-primary" @click="onSubmit">
        <b-icon icon="reply" size="is-small"></b-icon>
      </b-button>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Vue, Emit, Prop, Component } from "vue-property-decorator";
@Component
export default class ChatbotInput extends Vue {
  userInput = "";

  @Emit("submit")
  public onSubmit() {
    return this.userInput;
  }
}
</script>

<style>
</style>
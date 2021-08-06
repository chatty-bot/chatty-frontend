<template>
  <div class="section">
    <div class="container">
      <div class="buttons">
        <b-button tag="router-link" :to="{name:'Seq2SeqTesting'}">Modul testen</b-button>
        <b-button tag="router-link" :to="{name:'Seq2SeqTraining'}">Modul trainieren</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Seq2SeqDetailsNavbar extends Vue {}
</script>

<style>
</style>
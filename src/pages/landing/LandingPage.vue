<template>
  <div>
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import Component from "vue-class-component";
import Vue from "vue";

@Component({
  components: { AppHeader }
})
export default class LandingPage extends Vue {}
</script>

<style>
</style>
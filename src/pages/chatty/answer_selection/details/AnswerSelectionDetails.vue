<template>
  <div>
    <section class="hero is-primary is-small">
      <div class="hero-body">
        <div class="container">
          <div class="title has-text-white">{{answerSelectionName}}</div>
          <div class="buttons">
            <b-button
              tag="router-link"
              size="is-medium"
              type="is-primary"
              inverted
              outlined
              icon-left="chart-bar"
              :to="{
                name:'AnswerSelectionDetailsInformation'
              }"
            >Stats</b-button>
            <b-button
              tag="router-link"
              size="is-medium"
              type="is-primary"
              inverted
              outlined
              icon-left="meteor"
              :to="{
                name:'AnswerSelectionDetailsTraining'
              }"
            >Training</b-button>
            <b-button
              tag="router-link"
              size="is-medium"
              type="is-primary"
              inverted
              outlined
              icon-left="file-csv"
              :to="{
                name:'AnswerSelectionDetailsUpload'
              }"
            >Import data</b-button>
          </div>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <router-view v-if="answerSelectionModule" :answerSelectionModule="answerSelectionModule"></router-view>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { AnswerSelectionTO } from "../../../../client/chatty/models";
@Component
export default class AnswerSelectionDetails extends Vue {
  answerSelectionModule: AnswerSelectionTO | null = null;
  isLoading = false;
  get answerSelectionName() {
    return this.$route.params.answerSelectionName;
  }

  mounted() {
    this.isLoading = true;
    this.$http
      .get(
        "http://localhost:18080/answer_selection/" + this.answerSelectionName
      )
      .then(({ data }) => {
        console.info("Mounting answer selection module", data);
        this.answerSelectionModule = data;
        this.isLoading = false;
      });
  }
}
</script>

<style>
</style>
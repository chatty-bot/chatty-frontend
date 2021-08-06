<template>
  <div>
    <div v-if="classifierDomainObject">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="section">
            <div class="container">
              <h3 class="title">{{$route.params.classifierName}}</h3>
              <h5 class="subtitle">
                You can start testing your own classifiers or you can label your imported dataset.
                <br />For you to start first import your dataset
              </h5>
              <div class="buttons">
                <b-button
                  size="is-medium"
                  type="is-primary"
                  inverted
                  outlined
                  icon-left="chart-bar"
                  @click="displayStats"
                >Stats</b-button>
                <b-button
                  size="is-medium"
                  type="is-primary"
                  inverted
                  outlined
                  icon-left="meteor"
                  @click="displayTrain"
                >Training</b-button>
                <b-button
                  size="is-medium"
                  type="is-primary"
                  inverted
                  outlined
                  icon-left="tags"
                  @click="displayLabelData"
                >Label data</b-button>
                <b-button
                  size="is-medium"
                  type="is-primary"
                  inverted
                  outlined
                  icon-left="file-csv"
                  @click="displayImportData"
                >Import data</b-button>
                <b-button
                  size="is-medium"
                  type="is-primary"
                  inverted
                  outlined
                  icon-left="plus-circle"
                  @click="displayIntent"
                >Create intent</b-button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <router-view v-if="classifierDomainObject" :classifierDomainObject="classifierDomainObject"></router-view>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ClassifierDomainObject } from "../../../../client/chatty/models";

@Component
export default class ClassifiersDetails extends Vue {
  classifierDomainObject: ClassifierDomainObject | null = null;
  isLoading = false;

  get classifierName() {
    return this.$route.params.classifierName;
  }

  mounted() {
    this.isLoading = true;

    this.$http
      .get("http://localhost:18080/classifier/" + this.classifierName)
      .then(response => {
        console.info("Mounting classifier", response.data);
        this.classifierDomainObject = response.data;
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        if (err.status == "404") {
          console.error(
            "Mounting classifier with name failed:",
            this.classifierName,
            "not found"
          );
        }
      });
  }

  displayStats() {
    this.$router.push({ name: "ClassifiersDetailsInformation" });
  }
  displayTrain() {
    this.$router.push({ name: "ClassifiersDetailsTraining" });
  }
  displayLabelData() {
    this.$router.push({ name: "ClassifiersDetailsLabelData" });
  }
  displayImportData() {
    this.$router.push({ name: "ClassifiersDetailsUpload" });
  }
  displayIntent() {
    this.$router.push({ name: "ClassifiersDetailsIntents" });
  }
}
</script>

<style>
</style>
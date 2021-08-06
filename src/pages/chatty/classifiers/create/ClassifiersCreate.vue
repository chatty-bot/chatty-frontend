<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h3 class="title">Create Classifier</h3>
          <h5 class="subtitle">
            Create your own classifier that will be used within your bot. First you will have to name your classifier. Then you optionally you can import a dataset.
            After that you need to define intents that will be detected by your classifier.
          </h5>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <h3 class="subtitle ">Name your classifier</h3>
            <p
             
            >The name should be unique and should give hints what your classifier will be able to detect</p>
            <br />
            <b-field label="Classifier name" label-position="inside">
              <b-input v-model="classifierName"></b-input>
            </b-field>
            <b-button class="button is-primary is-pulled-right" @click="next">Create classifier</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
@Component
export default class ClassifiersCreate extends Vue {
  classifierName = "";

  next() {
    this.$http
      .post("http://localhost:18080/classifier", {
        classifierName: this.classifierName
      })
      .then(() => {
        this.$router.push({
          name: "ClassifiersDetailsInformation",
          params: { classifierName: this.classifierName }
        });
      });
    // create classifier and pass it to child router
  }
}
</script>

<style lang="scss" scoped>
</style>
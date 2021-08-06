<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box">
            <h3 class="title is-spaced">Create intents</h3>
            <p class="subtitle">
              Define intents that match either your previously imported dataset. Or if you have not imported a dataset
              then create the intents for which you will later create data.
            </p>
            <br />
            <b-field>
              <b-taginput size="is-medium" type="is-primary" v-model="newIntents" icon="tags"></b-taginput>
            </b-field>

            <b-button type="is-primary" size="is-medium" @click="createIntents">Create intent</b-button>

            <br />
            <br />

            <b-table :data="classifierDomainObject.intents" :columns="columns"></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ClassifierTO,
  IntentTO,
  ClassifierDomainObject
} from "../../../../../client/chatty/models";
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ClassifiersDetailsIntents extends Vue {
  @Prop()
  private classifierDomainObject!: ClassifierDomainObject;

  newIntents = [];
  columns = [
    { field: "intentName", label: "Intent" },
    { field: "numberSamples", label: "Number of samples" }
  ];

  createIntents(): void {
    this.$http
      .post("http://localhost:18080/intents/persistAll", {
        intents: this.newIntents,
        classifierName: this.classifierDomainObject.classifierName
      })
      .then(({ data }) => {
        const intents = data as IntentTO[];
        this.$buefy.toast.open({
          message: `Successfully created ${intents.length} intents`,
          type: "is-success"
        });
      });
  }
}
</script>

<style>
</style>
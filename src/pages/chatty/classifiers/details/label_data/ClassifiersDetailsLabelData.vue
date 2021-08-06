<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <b-field>
            <b-input type="textarea" expanded v-model="sampleText"></b-input>
          </b-field>
          <div class="buttons">
            <b-button type="is-primary" @click="saveSample">Save</b-button>
            <b-button @click="classify">Classify</b-button>
          </div>
        </div>
        <div class="column">
          <div
            class="field no-hover"
            v-for="intent in classifierDomainObject.intents"
            :key="intent.id"
          >
            <b-radio :native-value="intent.intentName" v-model="sampleLabel">{{intent.intentName}}</b-radio>
          </div>
          <div v-if="classificationResults.length>0" class="box">
            <div
              v-for="(result,index) in classificationResults"
              :key="index"
              class="content"
            >{{result.predictions[0]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  TextClassificationPredictionRequest,
  TrainingType,
  ClassifierDomainObject,
  ClassifierDataSampleTO,
  TextClassificationPredictionResult
} from "../../../../../client/chatty/models";
@Component
export default class ClassifiersDetailsLabelData extends Vue {
  @Prop() classifierDomainObject!: ClassifierDomainObject;

  classificationResults = [];
  sampleText = "";
  sampleLabel = "";

  classify() {
    this.$http
      .post(
        "http://localhost:18080/gateway/predict/" +
          this.classifierDomainObject.classifierName,
        {
          inputs: [this.sampleText],
          type: [TrainingType.CNN]
        } as TextClassificationPredictionRequest
      )
      .then(({ data }) => {
        this.classificationResults = data;
      });
  }

  saveSample() {
    this.$http
      .post(
        "http://localhost:18080/classifier/" +
          this.classifierDomainObject.classifierName +
          "/save_sample",
        {
          text: this.sampleText,
          label: this.sampleLabel
        } as ClassifierDataSampleTO
      )
      .then(({ data }) => {
        const newDataSample = data as ClassifierDataSampleTO;
        console.info(
          `Created new data sample with text ${newDataSample.text} and label ${newDataSample.label}`
        );
        this.sampleText = "";
        this.$buefy.toast.open({
          message: `Added new sample data sample`,
          type: "is-success"
        });
      })
      .catch(error => {
        this.$buefy.toast.open({
          message: error.data.message,
          type: "is-warning"
        });
      });
  }
}
</script>

<style scopd>
</style>
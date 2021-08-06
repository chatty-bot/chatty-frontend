<template>
  <div class="box">
    <h3 class="title">Answer Selection</h3>
    <p class="subtitle">Submit a sentence for which a response will be selected.</p>
    <b-field label="Test answer selection" label-position="inside">
      <b-input v-model="sentence"></b-input>
    </b-field>
    <b-field label="Select a classifier that will be used to filter a corret answer">
      <b-select v-model="selectedClassifier" placeholder="Select a classifier">
        <option
          v-for="classifier in answerSelectionModule.classifiers"
          :value="classifier.classifierName"
          :key="classifier.id"
        >{{ classifier.classifierName }}</option>
      </b-select>
    </b-field>
    <div class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <div class="level-item">
          <b-field>
            <b-button type="is-primary" @click="predict">Submit</b-button>
          </b-field>
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-left">
        <div class="columns">
          <div class="column is-6">{{prediction}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { AnswerSelectionTO } from "../../../../../client/chatty/models";

@Component
export default class AnswerSelectionDetailsInformation extends Vue {
  sentence = "";
  prediction = "";
  selectedClassifier = null;
  @Prop() answerSelectionModule!: AnswerSelectionTO;

  mounted() {
    console.log(this.answerSelectionModule);
  }

  predict() {
    this.$http
      .post(
        "http://localhost:18080/gateway/answer_selection/predict/" +
          this.answerSelectionModule.answerSelectionName,
        {
          inputs: [this.sentence]
        },

        {
          params: {
            classifier_name: this.selectedClassifier
          }
        }
      )
      .then(({ data }) => {
        this.prediction = data;
      });
  }
}
</script>

<style>
</style>
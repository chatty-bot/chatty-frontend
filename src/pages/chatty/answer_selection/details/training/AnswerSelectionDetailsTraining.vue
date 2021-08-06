<template>
  <div class="columns">
    <div class="column is-4">
      <div class="box">
        <p class="title">QA-CNN</p>
        <p
          class="subtitle"
        >In deep learning, a convolutional neural network (CNN, or ConvNet) is a class of deep neural networks, most commonly applied to analyzing visual imagery. They are also known as shift invariant or space invariant artificial neural networks (SIANN), based on their shared-weights architecture and translation invariance characteristics</p>
        <b-field label="Epochs">
          <b-numberinput v-model="defaultEpochs"></b-numberinput>
        </b-field>
        <b-field>
          <b-button
            expanded
            type="is-primary"
            size="is-medium"
            @click="startQACNNTraining"
          >Start training</b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { AnswerSelectionTO } from "../../../../../client/chatty/models";

@Component
export default class AnswerSelectionDetailsTraining extends Vue {
  defaultEpochs = 20;
  @Prop() answerSelectionModule!: AnswerSelectionTO;

  startQACNNTraining() {
    this.$http.get(
      "http://localhost:18080/gateway/answer_selection/train/" +
        this.answerSelectionModule.answerSelectionName,
      {
        params: {
          epochs: this.defaultEpochs
        }
      }
    );
  }
}
</script>

<style>
</style>
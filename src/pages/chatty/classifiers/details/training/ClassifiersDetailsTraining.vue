<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box">
            <p class="subtitle">LSTM</p>
            <p
              class="subtitle"
            >Long short-term memory (LSTM) is an artificial recurrent neural network used in the field of deep learning. Unlike standard feedforward neural networks, LSTM has feedback connections. It can not only process single data points (such as images), but also entire sequences of data (such as speech or video)</p>

            <b-field>
              <b-button expanded type="is-primary" size="is-medium">Start training</b-button>
            </b-field>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <p class="subtitle">CNN</p>
            <p
              class="subtitle"
            >In deep learning, a convolutional neural network (CNN, or ConvNet) is a class of deep neural networks, most commonly applied to analyzing visual imagery. They are also known as shift invariant or space invariant artificial neural networks (SIANN), based on their shared-weights architecture and translation invariance characteristics</p>

            <b-button
              expanded
              type="is-primary"
              size="is-medium"
              @click="startCNNTraining"
            >Start training</b-button>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <p class="subtitle">SVM</p>
            <p
              class="subtitle"
            >In machine learning, support-vector machines are supervised learning models with associated learning algorithms that analyze data used for classification and regression analysis</p>
            <b-button
              expanded
              type="is-primary"
              size="is-medium"
              @click="startSVMTraining"
            >Start training</b-button>
          </div>
        </div>
      </div>

      <div class="box">
        <div v-if="classifierDomainObject.trainings">
          <div
            class="training-item"
            v-for="(training,index) in classifierDomainObject.trainings"
            :key="index"
          >
            <div class="level">
              <div class="level-left">
                <div class="level-item">{{training.trainingType}}</div>
                <div class="level-item">
                  <b-tag
                    v-if="training.trainingStatus=='DONE'"
                    type="is-success"
                  >{{training.trainingStatus}}</b-tag>
                  <b-tag
                    v-else-if="training.trainingStatus=='IN_PROGRESS'"
                    type="is-warning"
                  >{{training.trainingStatus}}</b-tag>
                  <b-tag v-else type="is-danger">{{training.trainingStatus}}</b-tag>
                </div>
              </div>
              <div class="level-right">
                <b-icon icon="trash"></b-icon>
              </div>
            </div>
          </div>
        </div>

        <div v-else>No Training available yet</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ClassifierDomainObject } from "../../../../../client/chatty/models";
@Component
export default class ClassifiersDetailsTraining extends Vue {
  @Prop() classifierDomainObject!: ClassifierDomainObject;

  startSVMTraining() {
    this.$http.get(
      "http://localhost:18080/gateway/train/" +
        this.classifierDomainObject.classifierName,
      {
        params: {
          training_type: "SVM",
          epochs: 0
        }
      }
    );
  }
  startCNNTraining() {
    this.$http.get(
      "http://localhost:18080/gateway/train/" +
        this.classifierDomainObject.classifierName,
      {
        params: {
          training_type: "CNN",
          epochs: 10
        }
      }
    );
  }
}
</script>

<style scoped>
.training-item {
  padding: 7px;
}
</style>
<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <div class="box">
            <h3 class="title">Test classifier</h3>
            <p class="subtitle">Submit a sentence that will be tested by all models.</p>
            <b-field label="Test classifier" label-position="inside">
              <b-input v-model="input"></b-input>
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
            <div v-for="prediction in predictions" :key="prediction.model_type">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">{{prediction.model_type}}</div>
                  <div class="level-item">{{prediction.predictions[0]}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <div class="box">
            <PieChart
              v-if="classifierDomainObject.metrics"
              :chartData="chartData"
              :chartOptions="options"
            ></PieChart>
            <div v-else>No training yet</div>
          </div>
        </div>
        <div class="column is-6">
          <div class="box">
            <BarChart
              v-if="classifierDomainObject.intents"
              :chartData="barChartData"
              :chartOptions="barOptions"
            ></BarChart>
            <div v-else>No intents available</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import { Vue, Component, Prop } from "vue-property-decorator";
import { ChartData, ChartOptions } from "chart.js";
import {
  ClassifierDomainObject,
  TextClassificationPredictionRequest
} from "../../../../../client/chatty/models";

@Component({
  components: { PieChart, BarChart }
})
export default class ClassifiersDetailsInformation extends Vue {
  @Prop() classifierDomainObject!: ClassifierDomainObject;

  input = "";
  predictions = [];
  colormaps = [
    [
      "#ff666c",
      "#fe7775",
      "#fd877c",
      "#fc9683",
      "#fba589",
      "#fab28d",
      "#f9bf90",
      "#f9cc91",
      "#fad98f",
      "#fbe58c",
      "#fcf186",
      "#fffd7c"
    ],
    [
      "#503591",
      "#5a499a",
      "#635ba2",
      "#6d6eab",
      "#7680b4",
      "#7f93bd",
      "#89a6c5",
      "#93b9ce",
      "#9fccd7",
      "#acdfe0",
      "#bff1e9",
      "#e2fff2"
    ],
    [
      "#1d2343",
      "#2f3251",
      "#414260",
      "#54526f",
      "#67637f",
      "#7b748f",
      "#9085a0",
      "#a597b1",
      "#bbaac2",
      "#d0bcd4",
      "#e7cfe6",
      "#c6f4e8"
    ],
    [
      "#1d2343",
      "#30324e",
      "#42425a",
      "#565266",
      "#6a6373",
      "#7e7480",
      "#93858d",
      "#a9979a",
      "#bfa9a8",
      "#d5bcb6",
      "#eccec4",
      "#ffe3d9"
    ]
  ];
  options = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: "Precision per intent"
    }
  };
  barOptions = {
    responsive: true,
    maintainAspectRatio: true
  } as ChartOptions;
  chartData: ChartData = {};
  barChartData: ChartData = {};

  created() {
    this.setupSamplesPerIntent();
    this.setupAccuracyScores();
  }

  setupAccuracyScores() {
    if (this.classifierDomainObject.metrics) {
      let trainingTypes = [
        ...new Set(
          this.classifierDomainObject.metrics.map(it => it.trainingType)
        )
      ];

      let intents = [
        ...new Set(this.classifierDomainObject.metrics.map(it => it.intentName))
      ];
      this.chartData = {
        labels: intents,
        datasets: trainingTypes.map(trainingType => {
          let scoresForTrainingType = this.classifierDomainObject.metrics
            .filter(
              metricsEntity => metricsEntity.trainingType === trainingType
            )
            .map(metricsEntity => metricsEntity.precision);
          return {
            backgroundColor: this.colormaps[
              Math.floor(Math.random() * this.colormaps.length)
            ],
            data: scoresForTrainingType,
            label: trainingType
          };
        })
      };
    }
  }
  setupSamplesPerIntent() {
    if (this.classifierDomainObject.intents) {
      this.barChartData = {
        labels: this.classifierDomainObject.intents.map(it => it.intentName),
        datasets: [
          {
            label: "Intent",
            backgroundColor: this.colormaps[
              Math.floor(Math.random() * this.colormaps.length)
            ],
            data: this.classifierDomainObject.intents.map(
              it => it.numberOfSamples
            )
          }
        ]
      };
    }
  }

  predict() {
    let trainingTypes = [
      ...new Set(this.classifierDomainObject.metrics.map(it => it.trainingType))
    ];

    this.$http
      .post(
        "http://localhost:18080/gateway/predict/" +
          this.classifierDomainObject.classifierName,
        {
          inputs: [this.input],
          type: trainingTypes
        } as TextClassificationPredictionRequest
      )
      .then(response => {
        this.predictions = response.data;
      });
  }
}
</script>

<style>
</style>